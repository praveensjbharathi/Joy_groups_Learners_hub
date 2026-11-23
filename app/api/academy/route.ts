import {localized,localizedLesson} from '../../../lib/localization-server';
import {requestLanguage} from '../../../lib/locale';
import {deliveryUnits} from '../../../lib/delivery-learning';
import {grade,validAnswers} from '../../../lib/lesson-model';
import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../../chatgpt-auth';
import { ensureState, OWNER_EMAIL, productIds, snapshot, today } from '../../../lib/academy-server';
import { modules } from '../../../lib/content';
import type { AcademyState, Member } from '../../../lib/types';
import { z } from 'zod';
import { publicAcademy } from '../../../lib/public-academy';
import { getHub, roleFor, selfFor, canManage } from '../../../lib/hub-server';
export const dynamic='force-dynamic';
const text=z.string().trim().min(1).max(300);const note=z.string().trim().max(5000);const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal(''));
const moduleId=z.enum(modules.map(m=>m.id) as [string,...string[]]);
const schemas:any={
 worksheet:z.object({member:text,kind:z.enum(['Qualification','Quotation','Follow-up']),title:text,data:z.record(z.string().max(100),z.string().max(5000)).refine(v=>Object.keys(v).length<=20)}),
 addMember:z.object({name:text,email:z.string().email().max(254),role:text,path:z.enum(['Onboarding','Refresher','Technical','Services']),due:date}),
 assign:z.object({member:text,modules:z.array(moduleId).min(1).max(20),path:text,due:date,newCycle:z.boolean()}),
 read:z.object({member:text,module:moduleId,notes:z.string().trim().min(15).max(5000)}),
 quiz:z.object({member:text,module:moduleId,answers:z.array(z.union([z.number().int().min(0).max(10),z.array(z.number().int().min(0).max(10))])).min(10).max(50)}),
 lessonAssessment:z.object({member:text,module:moduleId,answers:z.array(z.union([z.number().int().min(0).max(10),z.array(z.number().int().min(0).max(10))])).min(10).max(50),practice:z.string().trim().min(80).max(5000)}),
 demo:z.object({member:text,product:z.enum(productIds as [string,...string[]]),ratings:z.array(z.number().int().min(0).max(20)).length(5),accurate:z.boolean(),releaseChecked:z.boolean(),notes:z.string().trim().min(15).max(5000)}),
 action:z.object({title:text,owner:text,due:date,priority:z.number().int().min(1).max(3)}),
 actionStatus:z.object({id:text,done:z.boolean()}),
 topic:z.object({title:text,owner:text,due:date,notes:note}),
 topicStatus:z.object({id:text,done:z.boolean()}),
 fact:z.object({id:text,title:text,detail:z.string().trim().min(10).max(5000),status:z.enum(['Verified','Tentative','Incomplete','Needs confirmation']),source:text,owner:text,evidence:z.string().trim().min(10).max(3000)}),
 review:z.object({notes:z.string().trim().min(15).max(5000)})
};
const reply=(data:any,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){try{const user=await getChatGPTUser();if(!user)return reply(publicAcademy());const row=await ensureState(user);if(!row)return reply(publicAcademy(user));const state:AcademyState=JSON.parse(row.payload);const hub=await getHub(user);const hubRole=roleFor(hub,user);if(selfFor(hub,user)?.status==='Exited'&&hubRole!=='Super Admin')return reply(publicAcademy(user));const manager=hubRole==='Super Admin'||hubRole==='HR';if(hubRole==='HR'){const ids=new Set(hub.members.filter(m=>canManage(hub,user,m)||m.id===selfFor(hub,user)?.id).map(m=>m.id));state.members=state.members.filter(m=>ids.has(m.id));state.attempts=state.attempts.filter(a=>ids.has(a.member));state.reads=state.reads.filter(a=>ids.has(a.member));state.demos=state.demos.filter(a=>ids.has(a.member));state.worksheets=state.worksheets.filter(a=>ids.has(a.member));state.actions=state.actions.filter(a=>ids.has(a.owner));state.topics=state.topics.filter(a=>ids.has(a.owner));state.reviews=[];}const member=state.members.find(m=>(!!user.userId&&m.userId===user.userId)||m.email.toLowerCase()===user.email.toLowerCase());if(!manager&&!member)return reply(publicAcademy(user));
 if(!manager&&member){state.members=[member];state.attempts=state.attempts.filter(a=>a.member===member.id);state.reads=state.reads.filter(a=>a.member===member.id);state.demos=state.demos.filter(a=>a.member===member.id);state.actions=state.actions.filter(a=>a.owner===member.id||a.owner==='Team');state.topics=state.topics.filter(a=>a.owner===member.id||a.owner==='Team');state.worksheets=state.worksheets.filter(a=>a.member===member.id);state.reviews=[]}
 return reply({state,revision:row.revision,manager,publicView:false,signedIn:true,needsEnrollment:false,user:{name:member?.name??user.displayName,email:user.email,id:user.userId??member?.id},memberId:member?.id});}catch(e){console.error('academy load failed',e);return reply({error:'Training records could not load. Please retry.'},503)}}
export async function POST(request:Request){try{
 if(request.headers.get('sec-fetch-site')==='cross-site')return reply({error:'Cross-site updates are not allowed.'},403);
 const user=await getChatGPTUser();if(!user)return reply({error:'Sign in to save training records.'},401);
 const raw=await request.text();if(raw.length>25000)return reply({error:'This entry is too large.'},413);
 const body=JSON.parse(raw);if(!schemas[body.op])return reply({error:'Unknown training action.'},400);
 const parsed=schemas[body.op].safeParse(body.data);if(!parsed.success)return reply({error:'Check all required fields, dates and values.'},400);const d=parsed.data;
 const row=await ensureState(user);if(!row)return reply({error:'Academy roster is not initialized.'},403);
 if(row.revision!==body.revision)return reply({error:'Another update was saved. Refresh the records and try again.'},409);
 const s:AcademyState=JSON.parse(row.payload);const hub=await getHub(user);const hubRole=roleFor(hub,user);const manager=hubRole==='Super Admin'||hubRole==='HR';if(hubRole==='HR'){if(['addMember','fact','review'].includes(body.op))return reply({error:'Use the Learning Hub for scoped employee invitations and reviews. Knowledge approval requires Super Admin.'},403);const target=d.member||d.owner;if(target){const hm=hub.members.find(m=>m.id===target);if(!hm||!(canManage(hub,user,hm)||hm.id===selfFor(hub,user)?.id&&['read','quiz','worksheet','lessonAssessment'].includes(body.op)))return reply({error:'Employee is outside your HR scope.'},403);}if(d.id){const record=[...s.actions,...s.topics].find(a=>a.id===d.id);const hm=hub.members.find(m=>m.id===record?.owner);if(!hm||!canManage(hub,user,hm))return reply({error:'Record is outside your HR scope.'},403);}}const hubSelf=selfFor(hub,user);if(hubSelf?.status==='Exited')return reply({error:'Employee has exited. Contact HR.'},403);
 const self=s.members.find(m=>(!!user.userId&&m.userId===user.userId)||m.email.toLowerCase()===user.email.toLowerCase());
 if(!manager&&!self)return reply({error:'You are not on the academy roster.'},403);
 if(!manager&&!['read','quiz','worksheet','lessonAssessment'].includes(body.op))return reply({error:'Only the training lead can change team, review or product records.'},403);
 if(!manager&&d.member!==self?.id)return reply({error:'You can only save your own learning.'},403);
 if(self&&!self.userId&&user.userId)self.userId=user.userId;
 const m:Member|undefined=d.member?s.members.find(m=>m.id===d.member):undefined;
 if(d.member&&!m)return reply({error:'Team member was not found.'},404);
 if(['read','quiz','lessonAssessment'].includes(body.op)&&!m!.assigned.includes(d.module))return reply({error:'Assign this module before recording progress.'},400);
 let result:any=null;const now=new Date().toISOString();
 switch(body.op){
 case 'worksheet':s.worksheets.push({id:crypto.randomUUID(),...d,date:now});break;
 case 'addMember':{if(s.members.some(m=>m.email.toLowerCase()===d.email.toLowerCase()))return reply({error:'This email is already on the roster.'},400);const assigned=modules.filter(m=>d.path==='Onboarding'||d.path==='Refresher'&&['m02','m03','m11','m12'].includes(m.id)||d.path==='Technical'&&['m01','m04','m05','m06','m07','m08','m11','m12'].includes(m.id)||d.path==='Services'&&['m01','m03','m09','m10','m11','m12'].includes(m.id)).map(m=>m.id);s.members.push({id:crypto.randomUUID(),...d,email:d.email.toLowerCase(),assigned,cycle:1,joined:today()});break}
 case 'assign':m!.assigned=[...new Set(d.modules)] as string[];m!.path=d.path;m!.due=d.due;if(d.newCycle)m!.cycle++;break;
 case 'read':s.reads=s.reads.filter(r=>!(r.member===m!.id&&r.module===d.module&&r.cycle===m!.cycle));s.reads.push({member:m!.id,module:d.module,cycle:m!.cycle,date:now,notes:d.notes});break;
 case 'quiz':case 'lessonAssessment':{const mod=deliveryUnits.find(x=>x.id==='delivery-'+d.module)!;if(!validAnswers(mod.quiz,d.answers))return reply({error:'Answer all current questions using the correct response type.'},400);result=grade(localizedLesson(mod,requestLanguage(request)).quiz,d.answers);s.attempts.push({id:crypto.randomUUID(),member:m!.id,module:d.module,cycle:m!.cycle,score:result.score,date:now,answers:d.answers,assessmentVersion:result.assessmentVersion,questionCount:result.questionCount,language:requestLanguage(request)});if(body.op==='lessonAssessment'){s.reads=s.reads.filter(r=>!(r.member===m!.id&&r.module===d.module&&r.cycle===m!.cycle));s.reads.push({member:m!.id,module:d.module,cycle:m!.cycle,date:now,notes:d.practice});}break}
 case 'demo':s.demos.push({id:crypto.randomUUID(),...d,member:m!.id,cycle:m!.cycle,score:d.ratings.reduce((a:number,b:number)=>a+b,0),reviewer:user.displayName,date:now});break;
 case 'action':if(d.owner!=='Team'&&!s.members.some(m=>m.id===d.owner))return reply({error:'Choose a valid action owner.'},400);s.actions.push({id:crypto.randomUUID(),...d,done:false,created:now});break;
 case 'actionStatus':{const a=s.actions.find(a=>a.id===d.id);if(!a)return reply({error:'Action not found.'},404);a.done=d.done;break}
 case 'topic':if(d.owner!=='Team'&&!s.members.some(m=>m.id===d.owner))return reply({error:'Choose a valid topic owner.'},400);s.topics.push({id:crypto.randomUUID(),...d,done:false});break;
 case 'topicStatus':{const t=s.topics.find(t=>t.id===d.id);if(!t)return reply({error:'Topic not found.'},404);t.done=d.done;break}
 case 'fact':{const f=s.facts.find(f=>f.id===d.id);if(f)Object.assign(f,d,{reviewed:today()});else s.facts.push({...d,reviewed:today()});break}
 case 'review':s.reviews.push({id:crypto.randomUUID(),date:now,reviewer:user.displayName,notes:d.notes,summary:snapshot(s),actions:s.actions.filter(a=>!a.done).sort((a,b)=>a.priority-b.priority||(a.due||'9999').localeCompare(b.due||'9999')).slice(0,3).map(a=>`${a.title} · ${s.members.find(m=>m.id===a.owner)?.name??a.owner} · ${a.due||'No date'}`)});break;
 }
 const saved=await env.DB!.prepare('UPDATE academy_state SET payload = ?, revision = revision + 1, updated_at = ? WHERE id = ? AND revision = ?').bind(JSON.stringify(s),now,'academy',row.revision).run();if(!saved.meta.changes)return reply({error:'Another update was saved. Refresh and try again.'},409);
 return reply({ok:true,result:localized(result,requestLanguage(request))});
 }catch(e){if(e instanceof SyntaxError)return reply({error:'Invalid request body.'},400);console.error('academy update failed',e);return reply({error:'The update could not be saved. Your existing records are unchanged.'},503)}}
