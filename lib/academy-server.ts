import { env } from 'cloudflare:workers';
import { initialFacts, modules, products } from './content';
import { completion } from './types';
import type { AcademyState } from './types';
export const OWNER_EMAIL=(env.INITIAL_ADMIN_EMAIL||'praveen.red.07@gmail.com').trim().toLowerCase();
export const today=()=>new Date().toISOString().slice(0,10);
export function seed(user:{userId:string|null;displayName:string;email:string}):AcademyState{
 const due=new Date(Date.now()+30*86400000).toISOString().slice(0,10);
 return {members:[{id:crypto.randomUUID(),name:user.displayName.includes('@')?'Praveen B':user.displayName,email:user.email,userId:user.userId??undefined,role:'Executive Director / Training lead',path:'Onboarding',assigned:modules.map(m=>m.id),due,cycle:1,joined:today()}],reads:[],attempts:[],demos:[],facts:initialFacts,actions:[],topics:[{id:'topic-release',title:'Validate the current People HR release and demo environment',owner:'Team',due:'',done:false,notes:'Engineering: module evidence, known gaps and supported devices.'},{id:'topic-commercial',title:'Approve the commercial rate card and quote review process',owner:'Team',due:'',done:false,notes:'Finance: resolve ambiguous draft prices, setup fees and discount authority.'},{id:'topic-proof',title:'Build an approved customer proof and demo-data library',owner:'Team',due:'',done:false,notes:'Delivery: synthetic demo data, consented case studies and handover checklist.'}],reviews:[],worksheets:[]};
}
export async function loadState(){if(!env.DB)throw new Error('Training database is unavailable');return await env.DB.prepare('SELECT revision,payload FROM academy_state WHERE id = ?').bind('academy').first<{revision:number;payload:string}>()}
export async function ensureState(user:any){let row=await loadState();if(!row&&user.email.toLowerCase()===OWNER_EMAIL){const s=seed(user);await env.DB!.prepare('INSERT OR IGNORE INTO academy_state (id,revision,payload,updated_at) VALUES (?,0,?,?)').bind('academy',JSON.stringify(s),new Date().toISOString()).run();row=await loadState()}return row}
export function snapshot(s:AcademyState){return `${s.members.length} members · ${s.members.length?Math.round(s.members.reduce((n,m)=>n+completion(s,m),0)/s.members.length):0}% learning completion · ${s.attempts.length} assessment attempts · ${s.demos.length} demo reviews · ${s.topics.filter(t=>!t.done).length} pending topics`}
export const productIds=products.map(p=>p.id);
