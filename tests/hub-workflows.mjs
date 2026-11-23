import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {mkdtemp,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
const dir=await mkdtemp(path.join(tmpdir(),'joy-hub-test-'));
const tables={hub:null,academy:null};
const db={prepare(sql){let args=[];return {bind(...a){args=a;return this},async first(){const t=sql.includes('hub_state')?'hub':'academy';return tables[t]?{...tables[t]}:null},async run(){const t=sql.startsWith('UPDATE hub_state')||sql.startsWith('INSERT')&&sql.includes('hub_state')?'hub':'academy';if(sql.startsWith('INSERT')){if(!tables[t])tables[t]={revision:0,payload:args[1]};return {meta:{changes:1}};}if(sql.startsWith('UPDATE')){if(!tables[t]||tables[t].revision!==args[3])return {meta:{changes:0}};if(sql.includes('EXISTS')&&tables.hub.revision!==args[5])return {meta:{changes:0}};tables[t]={revision:tables[t].revision+1,payload:args[0]};return {meta:{changes:1}};}throw new Error(sql)}}},async batch(stmts){return Promise.all(stmts.map(s=>s.run()))}};
globalThis.__joyEnv={DB:db};globalThis.__joyUser=null;
const source=`export {GET,POST} from './app/api/hub/route';export {GET as legacyGET,POST as legacyPOST} from './app/api/academy/route';export {GET as fileGET,POST as filePOST} from './app/api/hub/files/route';export {baseline,filtered,allowedUnit,allUnits} from './lib/hub-server';export {units} from './lib/hub-content';export {requestLanguage,formatDate} from './lib/locale';export {deliveryUnits} from './lib/delivery-learning';export {grade,validAnswers,currentAttempt} from './lib/lesson-model';export {GET as learningGET} from './app/api/learning/[id]/route';`;
await build({stdin:{contents:source,resolveDir:process.cwd(),sourcefile:'test-entry.ts'},bundle:true,format:'esm',platform:'node',target:'node22',outfile:path.join(dir,'bundle.mjs'),plugins:[{name:'runtime-test-stubs',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'cloudflare',namespace:'test'}));b.onResolve({filter:/chatgpt-auth$/},()=>({path:'auth',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},a=>({contents:a.path==='auth'?'export async function getChatGPTUser(){return globalThis.__joyUser}':'export const env=globalThis.__joyEnv',loader:'js'}));}}]});
const app=await import(pathToFileURL(path.join(dir,'bundle.mjs')));
const user=email=>({email,userId:'id-'+email,displayName:email,fullName:null});
const owner=user('praveen.red.07@gmail.com'),hr=user('hr@example.test'),hr2=user('otherhr@example.test'),alice=user('alice@example.test'),bob=user('bob@example.test');
const member=(id,email,access,company,scopes=[])=>({id,email,name:id,userId:'id-'+email,access,company,country:'India',department:'Operations',job:'Coordinator',supervisor:'',due:'2026-12-01',tracks:['foundation'],scopes,status:'Joining',profile:{},onboarding:'Draft',reviewNote:'',joined:'2026-11-16'});
function state(){return JSON.parse(tables.hub.payload)}
function setState(s){tables.hub={revision:tables.hub?.revision||0,payload:JSON.stringify(s)}}
const s=app.baseline();s.members=[member('owner',owner.email,'Super Admin','Joy Groups'),member('hr',hr.email,'HR','Joy Groups',['Joy Manpower Service']),member('hr2',hr2.email,'HR','Joy Groups',['Joy Corporate Solutions']),member('alice',alice.email,'User','Joy Manpower Service'),member('bob',bob.email,'User','Joy Corporate Solutions')];setState(s);
tables.academy={revision:0,payload:JSON.stringify({members:s.members.map(m=>({id:m.id,email:m.email,name:m.name,userId:m.userId,role:m.job,path:'Onboarding',assigned:['m01'],due:m.due,cycle:1,joined:m.joined})),reads:[],attempts:[],demos:[],facts:[],actions:[],topics:[],reviews:[],worksheets:[]})};
let checks=0;
async function post(as,op,data,expected=200,extra={}){globalThis.__joyUser=as;const res=await app.POST(new Request('https://joy.test/api/hub',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://joy.test',...extra.headers},body:JSON.stringify({op,data,revision:extra.revision??tables.hub.revision})}));const d=await res.json();assert.equal(res.status,expected,op+': '+JSON.stringify(d));checks++;return d}
async function get(as,url='https://joy.test/api/hub',expected=200){globalThis.__joyUser=as;const r=await app.GET(new Request(url));const d=await r.json();assert.equal(r.status,expected);checks++;return d}
assert.equal(app.units.length,93);checks++;assert.equal(new Set(app.units.map(x=>x.id)).size,93);checks++;
const pub=await get(null);assert.equal(pub.state,undefined);checks++;assert.equal(pub.catalogue.some(x=>x.quiz),false);checks++;
await get(null,'https://joy.test/api/hub?lesson=global-01',403);
const lesson=await get(null,'https://joy.test/api/hub?lesson=foundation-01');assert.equal(lesson.lesson.quiz.some(q=>'correct'in q),false);checks++;
await post(null,'profile',{member:'alice',profile:{}},401);
await post(alice,'profile',{member:'bob',profile:{}},403);
await post(alice,'access',{member:'alice',access:'HR',scopes:['Joy Corporate Solutions']},403);
await post(hr,'assign',{member:'bob',tracks:['foundation'],due:'2026-12-01'},403);
await post(hr,'invite',{name:'Outside',email:'outside@example.test',company:'Joy Corporate Solutions',country:'India',department:'Ops',job:'Staff',due:'2026-12-01',tracks:['foundation']},403);
await post(hr,'invite',{name:'New colleague',email:'new@example.test',company:'Joy Manpower Service',country:'India',department:'Ops',job:'Staff',due:'2026-12-01',tracks:['foundation']});
assert.ok(JSON.parse(tables.academy.payload).members.some(m=>m.email==='new@example.test'));checks++;
const a=await get(alice);assert.deepEqual(a.state.members.map(m=>m.id),['alice']);checks++;
const h=await get(hr);assert.equal(h.state.members.some(m=>m.id==='bob'),false);checks++;
await post(alice,'profile',{member:'alice',profile:{}},403,{headers:{Origin:'https://evil.test'}});
await post(alice,'profile',{member:'alice',profile:{}},409,{revision:-1});
await post(alice,'ack',{member:'alice',policy:'coc-base',name:'Alice',confirm:true},400);
await post(owner,'policy',{title:'Reviewed COC',version:'1.0',company:'Joy Groups',country:'India',content:'Reviewed demonstration policy for workflow validation.',status:'Approved',confirm:false},400);
await post(owner,'policy',{title:'Reviewed COC',version:'1.0',company:'Joy Groups',country:'India',content:'Reviewed demonstration policy for workflow validation.',status:'Approved',confirm:true});
const p=state().policies.find(p=>p.title==='Reviewed COC');
await post(hr,'ack',{member:'alice',policy:p.id,name:'Alice',confirm:true},403);
await post(alice,'ack',{member:'alice',policy:p.id,name:'Alice',confirm:true});
await post(alice,'ack',{member:'alice',policy:p.id,name:'Alice',confirm:true},400);
await post(owner,'policy',{id:p.id,title:p.title,version:'2.0',company:p.company,country:p.country,content:'Silently rewritten terms',status:'Approved',confirm:true},400);
const u=app.allUnits(state()).find(x=>x.id==='foundation-01');
await post(alice,'assessment',{member:'alice',module:u.id,answers:u.quiz.map(q=>q.type==='multiple'?q.correctMultiple:q.correct),practice:'I prepared a source-backed role introduction, a practical values example, an exception and a named review owner.'});
const attempt=state().attempts.at(-1);assert.equal(attempt.score,100);checks++;
await post(alice,'reviewAttempt',{id:attempt.id,review:'Approved',note:'Self approved'},403);
await post(hr2,'reviewAttempt',{id:attempt.id,review:'Approved',note:'Wrong scope'},403);
await post(hr,'reviewAttempt',{id:attempt.id,review:'Approved',note:'Reviewed the role example and checked the evidence.'});
await post(hr,'assign',{member:'alice',tracks:['foundation'],due:'2026-12-01',refresher:true});assert.equal(state().cycles['alice:foundation-01'],2);checks++;
await post(alice,'declare',{member:'alice',kind:'Joining accuracy',value:'My joining details are accurate to the best of my knowledge.',name:'Alice',confirm:true});
await post(alice,'request',{member:'alice',category:'Confidential grievance',title:'Private case test',detail:'Sensitive test detail',priority:'Normal'});
const request=state().requests.at(-1);assert.equal(request.handler,'hr');checks++;
const ownView=await get(alice);assert.equal(ownView.state.requests[0].detail,'Sensitive test detail');checks++;
const adminView=await get(owner);assert.notEqual(adminView.state.requests[0].detail,'Sensitive test detail');checks++;
await post(owner,'requestUpdate',{id:request.id,reply:'Unauthorised read or reply'},403);
await post(hr,'requestUpdate',{id:request.id,status:'In progress',reply:'The designated handler has reviewed your request.'});
await post(alice,'requestUpdate',{id:request.id,status:'Resolved',reply:'Trying to self resolve'},400);
await post(alice,'requestUpdate',{id:request.id,status:'Reopened',reply:'Further support is needed.'});
await post(hr,'asset',{member:'alice',name:'Laptop',serial:'TEST-001',condition:'Good, charger included'});
await post(hr,'asset',{member:'alice',name:'Laptop duplicate',serial:'TEST-001',condition:'Good'},400);
const asset=state().assets.at(-1);
await post(hr,'assetStatus',{id:asset.id,status:'Acknowledged'},403);
await post(alice,'assetStatus',{id:asset.id,status:'Acknowledged'});
await post(alice,'exit',{member:'alice',lastDay:'2026-11-01',reason:'Test employee handover'});
const exit=state().exits.at(-1);
await post(hr,'exitUpdate',{id:exit.id,complete:true},400);
await post(hr,'exitUpdate',{id:exit.id,approve:true,lastDay:'2026-11-01'});
await post(hr,'exitUpdate',{id:exit.id,check:'Assets',note:'Cannot clear while custody remains'},400);
await post(hr,'assetStatus',{id:asset.id,status:'Returned',note:'Asset inspected and returned with charger.'});
for(const check of ['Handover','Assets','IT access','Finance settlement','HR documents'])await post(hr,'exitUpdate',{id:exit.id,check,note:'Authorised review completed with test evidence.'});
await post(hr,'exitUpdate',{id:exit.id,complete:true});assert.equal(state().members.find(m=>m.id==='alice').status,'Exited');checks++;
await post(alice,'declare',{member:'alice',kind:'Joining accuracy',value:'After exit',name:'Alice',confirm:true},403);
globalThis.__joyUser=hr;const legacy=await (await app.legacyGET()).json();assert.equal(legacy.state.members.some(m=>m.id==='bob'),false);checks++;
const legacyRes=await app.legacyPOST(new Request('https://joy.test/api/academy',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({op:'demo',revision:tables.academy.revision,data:{member:'bob',product:'people',ratings:[20,20,20,20,20],accurate:true,releaseChecked:true,notes:'Out of scope demo review'}})}));assert.equal(legacyRes.status,403);checks++;
globalThis.__joyUser=null;assert.equal((await app.fileGET(new Request('https://joy.test/api/hub/files?id=none'))).status,401);checks++;

const archived=await get(alice);assert.equal(archived.enrolled,false);assert.equal(archived.state,undefined);checks+=2;
await post(hr,'dispatch',{},403);
await post(owner,'dispatch',{});
await post(owner,'policy',{title:'Reviewed COC',version:'2.0',company:'Joy Groups',country:'India',content:'New reviewed policy version for regression validation.',status:'Approved',confirm:true});
assert.equal(state().policies.find(x=>x.id===p.id).status,'Retired');checks++;
assert.equal(state().acks.some(a=>a.policy===p.id),true);checks++;

const custom={track:'foundation',title:'New reviewed lesson',objective:'Learn a newly approved operational handoff.',steps:['Check the requirement.','Name the owner.','Record the evidence.'],normal:'The handoff has an owner.',exception:'The owner is missing.',escalation:'Ask HR to assign the owner.',practice:'Prepare a handoff checklist.',image:'support',source:'Test reviewed source',confirm:true,quiz:Array.from({length:10},(_,i)=>i).map(i=>({q:'Question '+i,options:['Reviewed action','Guess','Hide'],correct:0,why:'Use approved evidence.'}))};
await post(hr,'course',custom,403);
await post(owner,'course',custom);
const customId=state().customUnits[0].id;
const publicNew=await get(null);assert.equal(publicNew.catalogue.some(x=>x.id===customId),false);checks++;
await get(null,'https://joy.test/api/hub?lesson='+customId,403);
const bobNew=await get(bob);assert.equal(bobNew.catalogue.some(x=>x.id===customId),true);assert.equal(bobNew.state.customUnits,undefined);checks+=2;
const customLesson=await get(bob,'https://joy.test/api/hub?lesson='+customId);assert.equal('correct' in customLesson.lesson.quiz[0],false);checks++;

const enrolled=await get(bob);assert.ok(enrolled.state.members[0].tracks.includes('mandatory-coc'));assert.ok(enrolled.state.members[0].tracks.includes('law-india'));checks+=2;
assert.ok(enrolled.tracks.every(t=>t.group));checks++;
await post(hr2,'assign',{member:'bob',tracks:['foundation'],due:'2026-12-01'});
assert.ok(state().members.find(m=>m.id==='bob').tracks.includes('mandatory-coc'));assert.ok(state().members.find(m=>m.id==='bob').tracks.includes('law-india'));checks+=2;
const bp=state().policies.find(p=>p.title==='Reviewed COC'&&p.status==='Approved');
const fullPolicy=await get(bob,'https://joy.test/api/hub?lesson=policy-'+bp.id);assert.equal(fullPolicy.lesson.sections[0].body,bp.content);assert.equal('correct' in fullPolicy.lesson.quiz[0],false);checks+=2;
await get(null,'https://joy.test/api/hub?lesson=policy-'+bp.id,403);
let fixture=state(),bm=fixture.members.find(m=>m.id==='bob');bm.profile={'Phone':'+919999999999','WhatsApp':'+919999999999','Work location':'Coimbatore','Joining date':'2026-11-01','Emergency contact':'Test contact','Emergency phone':'+919999999998','Address':'Test address','Role / KRA understanding':'Test responsibility map'};fixture.documents.push({id:'test-doc',member:'bob',name:'test.pdf',kind:'Joining',size:10,date:new Date().toISOString(),key:'test/bob'});setState(fixture);
await post(bob,'ack',{member:'bob',policy:bp.id,name:'Bob',confirm:true});
await post(bob,'declare',{member:'bob',kind:'Joining accuracy',value:'My test joining details are accurate.',name:'Bob',confirm:true});
await post(bob,'submitOnboarding',{member:'bob'});
await post(hr2,'reviewOnboarding',{member:'bob',status:'Approved',note:'All other evidence checked, but mandatory learning incomplete.'},400);
fixture=state();const mandatory=app.allUnits(fixture).filter(x=>['mandatory-coc','law-india'].includes(x.track)&&(!x.company||x.company==='Joy Groups'||x.company==='Joy Corporate Solutions')&&(!x.country||x.country==='All'||x.country==='India'));for(const x of mandatory)fixture.attempts.push({id:'test-'+x.id,member:'bob',module:x.id,cycle:1,answers:x.quiz.map(q=>q.type==='multiple'?q.correctMultiple:q.correct),assessmentVersion:2,questionCount:x.quiz.length,score:100,practice:'Approved fixture-specific practical evidence for onboarding gate validation.',date:new Date().toISOString(),review:'Approved'});setState(fixture);
await post(hr2,'reviewOnboarding',{member:'bob',status:'Approved',note:'Current mandatory learning, policy acknowledgement and joining evidence all checked.'});
assert.equal(state().members.find(m=>m.id==='bob').onboarding,'Approved');checks++;
await post(bob,'country',{member:'bob',country:'UAE'},403);
await post(hr2,'country',{member:'bob',country:'UAE'});
const mapped=state().members.find(m=>m.id==='bob');assert.ok(mapped.tracks.includes('law-uae'));assert.equal(mapped.tracks.includes('law-india'),false);assert.ok(state().attempts.some(a=>a.member==='bob'&&a.module.startsWith('law-india')));checks+=3;
for(const unit of app.units.filter(x=>x.track==='law-india'||x.track==='law-uae')){assert.ok(unit.legalSources?.length);assert.equal(unit.mandatory,true);checks+=2;}

// Expanded lessons, mixed scoring and actual lesson routes.
const allExpanded=[...app.allUnits(state()),...app.deliveryUnits];
for(const unit of allExpanded){
 assert.ok(unit.quiz.length>=10,unit.id);assert.ok(unit.chapters.length>=9,unit.id);
 assert.ok(unit.chapters.flatMap(c=>c.paragraphs).join(' ').split(/\s+/).length>=650,unit.id);
 assert.ok(new Set(unit.quiz.map(q=>q.type)).size>=4,unit.id);
 assert.ok(new Set(unit.quiz.map(q=>q.q)).size===unit.quiz.length,unit.id);
 const answers=unit.quiz.map(q=>q.type==='multiple'?q.correctMultiple:q.correct);
 assert.equal(app.grade(unit.quiz,answers).score,100);assert.equal(app.validAnswers(unit.quiz,answers.slice(0,3)),false);checks+=7;
}
const base=app.allUnits(state()).find(x=>x.id==='foundation-01'),right=base.quiz.map(q=>q.type==='multiple'?q.correctMultiple:q.correct),multi=base.quiz.findIndex(q=>q.type==='multiple');
let changed=structuredClone(right);changed[multi]=[right[multi][0]];assert.equal(app.grade(base.quiz,changed).correctCount,base.quiz.length-1);checks++;
changed=structuredClone(right);changed[multi]=[0,0];assert.equal(app.validAnswers(base.quiz,changed),false);checks++;
changed=structuredClone(right);changed[0]=99;assert.equal(app.validAnswers(base.quiz,changed),false);checks++;
assert.equal(app.currentAttempt({score:100}),false);assert.equal(app.currentAttempt({assessmentVersion:2,questionCount:12}),true);checks+=2;
async function learning(as,id,expected=200){globalThis.__joyUser=as;const r=await app.learningGET(new Request('https://joy.test/api/learning/'+id));assert.equal(r.status,expected);checks++;return r.json()}
const lp=await learning(null,'foundation-01');assert.equal(lp.lesson.quiz.length,12);assert.equal(lp.history.length,0);assert.equal(lp.assigned,false);assert.ok(lp.lesson.chapters.length>=9);assert.equal(lp.lesson.quiz.some(q=>'correct'in q||'correctMultiple'in q||'why'in q),false);checks+=5;
await learning(null,'global-01',403);await learning(null,'missing-lesson',404);
const dl=await learning(null,'delivery-m07');assert.equal(dl.kind,'delivery');assert.equal(dl.lesson.quiz.length,12);assert.ok(dl.lesson.chapters.some(c=>c.id==='playbook-0'));checks+=3;
const selfLesson=await learning(bob,'foundation-01');assert.equal(selfLesson.history.some(a=>a.member!=='bob'),false);checks++;
await post(bob,'assessment',{member:'bob',module:'foundation-01',answers:[0,1,2],practice:'A sufficiently detailed synthetic exercise that names the role, evidence, exception and responsible owner.'},400);
// Legacy three-question attempts remain visible but cannot satisfy current onboarding gates.
fixture=state();fixture.members.find(m=>m.id==='bob').onboarding='Submitted';fixture.members.find(m=>m.id==='bob').country='India';for(const a of fixture.attempts.filter(a=>a.member==='bob')){delete a.assessmentVersion;delete a.questionCount;}setState(fixture);
await post(hr2,'reviewOnboarding',{member:'bob',status:'Approved',note:'Historical three-question records cannot satisfy the expanded assessment requirement.'},400);
assert.ok(state().attempts.some(a=>a.member==='bob'));checks++;
console.log('Content audit:',allExpanded.length,'expanded lessons; minimum',Math.min(...allExpanded.map(u=>u.quiz.length)),'questions; minimum',Math.min(...allExpanded.map(u=>u.chapters.flatMap(c=>c.paragraphs).join(' ').split(/\s+/).length)),'words.');


// Language changes preserve permissions, correct-option indices and stored training identities.
const languageScripts={ta:/[\u0B80-\u0BFF]/,hi:/[\u0900-\u097F]/,ar:/[\u0600-\u06FF]/};
for(const [lang,script] of Object.entries(languageScripts)){
 const l=await learning(null,'foundation-01?lang='+lang);assert.equal(l.lesson.id,'foundation-01');assert.equal(l.lesson.language,lang);assert.match(l.lesson.title,script);assert.ok(l.lesson.quiz.every(q=>script.test(q.q)));assert.equal(l.lesson.quiz.some(q=>'correct'in q||'correctMultiple'in q||'why'in q),false);checks+=5;
 await learning(null,'global-01?lang='+lang,403);
 const c=await get(null,'https://joy.test/api/hub?lang='+lang);assert.equal(c.language,lang);assert.equal(c.tracks[0].id,'mandatory-coc');assert.equal(c.tracks[0].group,'Mandatory training');assert.match(c.tracks[0].title,script);checks+=4;
 const before=tables.hub.revision,practiceResult=await post(null,'practice',{module:base.id,answers:right},200,{headers:{'X-Joy-Language':lang}});assert.equal(practiceResult.score,100);assert.match(practiceResult.feedback[0].why,script);assert.equal(tables.hub.revision,before);checks+=3;
 practiceResult.feedback.forEach((f,i)=>{const indices=Array.isArray(right[i])?[...right[i]].sort((a,b)=>a-b):[right[i]];assert.equal(f.answer,indices.map(n=>l.lesson.quiz[i].options[n]).join(' · '),'Native feedback must match the options actually displayed');checks++;});
}
await post(bob,'assessment',{member:'bob',module:'foundation-01',answers:right,practice:'This synthetic evidence identifies a role, a normal case, the exception, the evidence source and the responsible reviewer.'},200,{headers:{'X-Joy-Language':'ar'}});assert.equal(state().attempts.at(-1).language,'ar');assert.equal(state().attempts.at(-1).module,'foundation-01');checks+=2;
assert.equal(app.requestLanguage(new Request('https://joy.test/?lang=invalid')), 'en');assert.equal(app.requestLanguage(new Request('https://joy.test/?lang=hi',{headers:{'X-Joy-Language':'ar'}})),'hi');assert.equal(app.requestLanguage(new Request('https://joy.test/',{headers:{Cookie:'joy_language=ta'}})),'ta');checks+=3;

console.log(`PASS: ${checks} workflow, privacy, role, versioning, assessment, archive and migration checks.`);
await rm(dir,{recursive:true,force:true});
