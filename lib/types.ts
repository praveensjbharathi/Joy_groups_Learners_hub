import type {Answer,LearningQuestion} from './lesson-model';
import {currentAttempt} from './lesson-model';
export type Question=LearningQuestion;
export type Lesson={title:string;body:string[]};
export type Module={id:string;title:string;group:string;minutes:number;summary:string;outcome:string;lessons:Lesson[];practice:string;quiz:Question[]};
export type Product={id:string;name:string;tag:string;description:string;buyer:string;trigger:string;features:string[];discovery:string[];demo:string[];objections:[string,string][];scope:string;modules:string[]};
export type Fact={id:string;title:string;detail:string;status:'Verified'|'Tentative'|'Incomplete'|'Needs confirmation';source:string;owner:string;reviewed:string;evidence:string};
export type Member={id:string;name:string;email:string;userId?:string;role:string;path:string;assigned:string[];due:string;cycle:number;joined:string};
export type Attempt={id:string;member:string;module:string;cycle:number;score:number;date:string;answers:Answer[];assessmentVersion?:number;questionCount?:number;language?:'en'|'ta'|'hi'|'ar'};
export type ReadRecord={member:string;module:string;cycle:number;date:string;notes:string};
export type Demo={id:string;member:string;product:string;cycle:number;ratings:number[];accurate:boolean;releaseChecked:boolean;score:number;notes:string;reviewer:string;date:string};
export type Action={id:string;title:string;owner:string;due:string;priority:number;done:boolean;created:string};
export type Topic={id:string;title:string;owner:string;due:string;done:boolean;notes:string};
export type Review={id:string;date:string;notes:string;reviewer:string;summary:string;actions:string[]};
export type AcademyState={members:Member[];attempts:Attempt[];reads:ReadRecord[];demos:Demo[];facts:Fact[];actions:Action[];topics:Topic[];reviews:Review[];worksheets:Worksheet[]};
export const PASS=80;
export function moduleScore(s:AcademyState,m:Member,id:string){const a=s.attempts.filter(a=>a.member===m.id&&a.module===id&&a.cycle===m.cycle&&currentAttempt(a));return a.length?a[a.length-1].score:null}
export function complete(s:AcademyState,m:Member,id:string){return s.reads.some(r=>r.member===m.id&&r.module===id&&r.cycle===m.cycle)&&(moduleScore(s,m,id)??0)>=PASS}
export function completion(s:AcademyState,m:Member){return m.assigned.length?Math.round(m.assigned.filter(id=>complete(s,m,id)).length/m.assigned.length*100):0}
export function avgScore(s:AcademyState,m:Member){const scores=m.assigned.map(id=>moduleScore(s,m,id)).filter((x):x is number=>x!==null);return scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null}
export function latestDemo(s:AcademyState,m:Member,p:string){return s.demos.filter(d=>d.member===m.id&&d.product===p&&d.cycle===m.cycle).at(-1)}
export function readiness(s:AcademyState,m:Member,p:Product){const d=latestDemo(s,m,p.id);const learned=p.modules.every(id=>m.assigned.includes(id)&&complete(s,m,id));return learned&&d&&d.score>=PASS&&d.accurate&&d.releaseChecked?'Ready':learned?'Demo review':'Learning'}

export type PublicModule=Omit<Module,"quiz"> & {quiz:Pick<Question,"q"|"options">[]};

export type Worksheet={id:string;member:string;kind:string;title:string;data:Record<string,string>;date:string};
