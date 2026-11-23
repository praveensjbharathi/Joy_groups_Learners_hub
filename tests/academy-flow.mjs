import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';
import {DatabaseSync} from 'node:sqlite';
const sql=new DatabaseSync(':memory:');
sql.exec(readFileSync(new URL('../drizzle/0000_bright_young_avengers.sql',import.meta.url),'utf8'));
sql.exec(readFileSync(new URL('../drizzle/0001_chilly_killraven.sql',import.meta.url),'utf8'));
globalThis.__academyTestEnv={TEAM_DOMAIN:'https://test.cloudflareaccess.com',ACCESS_AUD:'test-audience',DB:{prepare(query){let args=[];return {bind(...v){args=v;return this},async first(){return sql.prepare(query).get(...args)??null},async run(){const r=sql.prepare(query).run(...args);return {meta:{changes:Number(r.changes)}}}}}}};
const authKeys=await generateKeyPair('RS256');const authJwk=await exportJWK(authKeys.publicKey);authJwk.kid='test-key';
globalThis.fetch=async url=>{assert.equal(String(url),'https://test.cloudflareaccess.com/cdn-cgi/access/certs');return Response.json({keys:[authJwk]});};
async function identity(email,sub){const jwt=await new SignJWT({email,type:'app'}).setProtectedHeader({alg:'RS256',kid:'test-key'}).setIssuer('https://test.cloudflareaccess.com').setAudience('test-audience').setSubject(sub).setIssuedAt().setExpirationTime('5m').sign(authKeys.privateKey);return {'cf-access-jwt-assertion':jwt};}
registerHooks({resolve(specifier,ctx,next){if(['cloudflare:workers','next/headers','next/navigation'].includes(specifier))return {url:'test:'+specifier,shortCircuit:true};if(specifier.startsWith('.')&&ctx.parentURL?.startsWith('file:')){const u=new URL(specifier,ctx.parentURL);if(!existsSync(fileURLToPath(u))&&existsSync(fileURLToPath(u)+'.ts'))return {url:u.href+'.ts',shortCircuit:true}}return next(specifier,ctx)},load(url,ctx,next){if(url==='test:cloudflare:workers')return {format:'module',source:'export const env = globalThis.__academyTestEnv;',shortCircuit:true};if(url==='test:next/headers')return {format:'module',source:'export async function headers(){return new Headers(globalThis.__academyTestHeaders)}',shortCircuit:true};if(url==='test:next/navigation')return {format:'module',source:'export function redirect(){throw new Error("Redirect")}',shortCircuit:true};if(url.endsWith('.ts')&&!url.includes('/node_modules/'))return {format:'module',source:ts.transpileModule(readFileSync(new URL(url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText,shortCircuit:true};return next(url,ctx)}});
const {GET,POST}=await import('../app/api/academy/route.ts');
const base='https://academy.test/api/academy';
const {deliveryUnits}=await import('../lib/delivery-learning.ts');
const correct=id=>deliveryUnits.find(m=>m.id==='delivery-'+id).quiz.map(q=>q.type==='multiple'?q.correctMultiple:q.correct);
const wrong=id=>deliveryUnits.find(m=>m.id==='delivery-'+id).quiz.map(q=>q.type==='multiple'?[2]:(q.correct+1)%q.options.length);
const lead=await identity('praveen.red.07@gmail.com','local-training-lead');
const trainee=await identity('academy-test@example.com','local-trainee');
async function get(headers=lead){globalThis.__academyTestHeaders=headers;const r=await GET();return {status:r.status,...await r.json()}}
async function post(op,data,headers=lead,rev){const s=await get(headers);globalThis.__academyTestHeaders=headers;const r=await POST(new Request(base,{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({op,data,revision:rev??s.revision})}));return {status:r.status,...await r.json()}}
const publicVisitor=await get({});assert.equal(publicVisitor.status,200);assert.equal(publicVisitor.publicView,true);assert.equal(publicVisitor.state.members[0].id,'public-visitor');assert.equal(publicVisitor.state.attempts.length,0);
let s=await get();assert.equal(s.status,200);const m=s.state.members[0].id;
assert.equal((await post('read',{member:m,module:'m01',notes:'Explained entities and future aspirations using synthetic examples.'})).status,200);
let combined=await post('lessonAssessment',{member:m,module:'m01',answers:correct('m01'),practice:'A synthetic group introduction distinguishes legal entities, verified facts and future goals, and names the owner for the next review.'});assert.equal(combined.status,200);assert.equal((await get()).state.attempts.at(-1).questionCount,12);assert.ok((await get()).state.reads.at(-1).notes.includes('synthetic'));
let q=await post('quiz',{member:m,module:'m01',answers:correct('m01')});assert.equal(q.result.score,100);
assert.equal((await get()).state.attempts.at(-1).score,100);
assert.equal((await post('quiz',{member:m,module:'m01',answers:wrong('m01')})).result.score,0);
assert.equal((await post('demo',{member:m,product:'people',ratings:[20,20,20,20,20],accurate:false,releaseChecked:false,notes:'Test demonstrates accuracy and release checks gate readiness.'})).status,200);
assert.equal((await post('addMember',{name:'QA Learner',email:'academy-test@example.com',role:'Test learner',path:'Onboarding',due:'2026-12-15'})).status,200);
s=await get();const t=s.state.members.find(m=>m.email==='academy-test@example.com');
let st=await get(trainee);assert.equal(st.state.members.length,1);assert.equal(st.memberId,t.id);assert.equal(st.manager,false);
assert.equal((await post('read',{member:m,module:'m01',notes:'Unauthorized access to another learner must be rejected.'},trainee)).status,403);
assert.equal((await post('action',{title:'Not allowed',owner:'Team',due:'2026-11-20',priority:1},trainee)).status,403);
assert.equal((await post('quiz',{member:t.id,module:'m01',answers:correct('m01')},trainee)).result.score,100);
assert.equal((await post('worksheet',{member:t.id,kind:'Qualification',title:'Synthetic Factory',data:{problem:'Attendance reconciliation',next:'Arrange a scoped demo'}},trainee)).status,200);
assert.equal((await post('assign',{member:t.id,modules:['m01','m02'],path:'Refresher',due:'2026-12-15',newCycle:true})).status,200);
st=await get(trainee);assert.equal(st.state.members[0].cycle,2);assert.equal(st.state.attempts.length,1);assert.equal(st.state.attempts[0].cycle,1);
assert.equal((await post('quiz',{member:t.id,module:'m03',answers:correct('m01')},trainee)).status,400);
assert.equal((await post('action',{title:'Review release evidence',owner:m,due:'2026-11-20',priority:1})).status,200);
assert.equal((await post('review',{notes:'Weekly test review captures progress, priority actions and open topics.'})).status,200);
s=await get();assert.equal(s.state.reviews.at(-1).actions.length,1);
const stale=s.revision;await post('topic',{title:'Validate demo scope',owner:'Team',due:'2026-11-20',notes:'Engineering review'});
assert.equal((await post('review',{notes:'This stale update must not overwrite newer records.'},lead,stale)).status,409);
assert.equal((await post('demo',{member:m,product:'people',ratings:[99,20,20,20,20],accurate:true,releaseChecked:true,notes:'Invalid numeric rubric should be rejected.'})).status,400);
const unknown=await get(await identity('unknown@example.com','unknown'));assert.equal(unknown.status,200);assert.equal(unknown.publicView,true);assert.equal(unknown.state.members[0].email,'');assert.equal(unknown.state.worksheets.length,0);assert.equal(unknown.state.reviews.length,0);assert.equal(unknown.signedIn,true);assert.equal(unknown.needsEnrollment,true);assert.equal(unknown.user.email,'unknown@example.com');
console.log('PASS: persistence, server scoring, latest attempts, cycle history, demo rubric, learner isolation, manager authorization, worksheets, action/review snapshots, validation and concurrent-update protection.');

const {readiness,complete,completion,avgScore}=await import('../lib/types.ts');
const {products}=await import('../lib/content.ts');
s=await get();const owner=s.state.members[0];const product=products[0];
assert.equal(readiness(s.state,owner,product),'Learning');
for(const id of product.modules){await post('read',{member:owner.id,module:id,notes:'Verified training exercise uses synthetic records and evidence.'});const content=deliveryUnits.find(m=>m.id==='delivery-'+id);await post('quiz',{member:owner.id,module:id,answers:correct(id)})}
await post('demo',{member:owner.id,product:product.id,ratings:[20,20,20,20,20],accurate:false,releaseChecked:true,notes:'High score but inaccurate claims must fail product readiness.'});
s=await get();assert.equal(readiness(s.state,owner,product),'Demo review');
await post('demo',{member:owner.id,product:product.id,ratings:[16,16,16,16,16],accurate:true,releaseChecked:true,notes:'All rubric and release gates now meet the internal threshold.'});
s=await get();assert.equal(readiness(s.state,owner,product),'Ready');
await post('quiz',{member:owner.id,module:'m01',answers:wrong('m01')});s=await get();assert.equal(readiness(s.state,owner,product),'Learning');
console.log('PASS: product readiness gates, latest failure invalidates readiness, and accurate/release-checked demo required.');

const {POST:practiceQuiz}=await import('../app/api/practice/route.ts');
const before=(await get()).revision;
const publicQuiz=await practiceQuiz(new Request(base,{method:'POST',body:JSON.stringify({module:'m01',answers:correct('m01')})}));
assert.equal(publicQuiz.status,200);assert.equal((await publicQuiz.json()).score,100);
assert.equal((await get()).revision,before);
globalThis.__academyTestHeaders={};
const anonymousWrite=await POST(new Request(base,{method:'POST',body:JSON.stringify({op:'read',data:{member:m,module:'m01',notes:'Anonymous write should always be denied.'},revision:before})}));
assert.equal(anonymousWrite.status,401);
console.log('PASS: anonymous/unknown visitors can learn without team data; public practice grading never writes team records; anonymous team writes rejected.');

// Regression: a verified provider subject may change; roster identity and access still follow the verified email.
const emailLead=await identity('praveen.red.07@gmail.com','new-owner-subject');
const emailTrainee=await identity('academy-test@example.com','new-learner-subject');
const signedOwner=await get(emailLead);assert.equal(signedOwner.manager,true);assert.equal(signedOwner.publicView,false);assert.equal(signedOwner.memberId,m);assert.equal(signedOwner.signedIn,true);
assert.equal((await post('read',{member:m,module:'m01',notes:'Email-attested owner retains the same persisted roster and access.'},emailLead)).status,200);
const signedLearner=await get(emailTrainee);assert.equal(signedLearner.manager,false);assert.equal(signedLearner.publicView,false);assert.equal(signedLearner.memberId,t.id);assert.equal(signedLearner.state.members.length,1);
assert.equal((await post('read',{member:m,module:'m01',notes:'A learner must not access another member through missing IDs.'},emailTrainee)).status,403);
assert.equal((await post('action',{title:'Cannot elevate',owner:'Team',due:'2026-11-20',priority:1},emailTrainee)).status,403);
const outside=await get(await identity('outside@example.com','outside'));assert.equal(outside.publicView,true);assert.equal(outside.signedIn,true);assert.equal(outside.needsEnrollment,true);assert.equal(outside.state.members[0].id,'public-visitor');assert.equal(outside.state.attempts.length,0);
const badIdentity=await get({'email':'praveen.red.07@gmail.com','x-user-email':'praveen.red.07@gmail.com'});assert.equal(badIdentity.publicView,true);assert.equal(badIdentity.signedIn,false);
const missingEmail=await get({'oai-authenticated-user-id':'local-training-lead'});assert.equal(missingEmail.publicView,true);assert.equal(missingEmail.signedIn,false);
const anonAfter=await get({});assert.equal(anonAfter.state.members[0].id,'public-visitor');assert.equal(anonAfter.signedIn,false);
console.log('PASS: verified Access JWT integration, stable roster IDs, learner isolation, enrollment status and rejected untrusted identity fields.');
