import type {Language} from './locale';
import {lessonContext} from './lesson-detail';
import ta from './native-copy/ta.json' with {type:'json'};
import hi from './native-copy/hi.json' with {type:'json'};
import ar from './native-copy/ar.json' with {type:'json'};

const copy={ta,hi,ar};
type TeachingLesson={title:string;track?:string;objective?:string;steps?:string[];normal?:string;exception?:string;escalation?:string;practice?:string;chapters?:{id:string;title:string;paragraphs:string[];points?:string[]}[];quiz?:any[]};

// Independently written teaching prose; factual fragments remain separately
// labelled statements instead of inheriting English sentence construction.
export function nativeLesson<T extends TeachingLesson>(source:T,translated:T,lang:Exclude<Language,'en'>,t:(s:string)=>string):T{
 if(!source.chapters?.some(c=>c.id==='understand')||!source.steps||!source.objective)return translated;
 const c=copy[lang],p=c.paragraphs,l=c.labels;
 const {guide:g,primer}=lessonContext({track:source.track||'foundation',title:source.title});
 const label=(name:string,value:string|undefined)=>value?name+': '+value:'';
 const objective=label(l.purpose,translated.objective),records=label(l.records,t(g.records)),owner=label(l.owner,t(g.owner)),standard=label(l.standard,t(g.measure));
 const steps=(translated.steps||[]).map((step,i)=>l.step+' '+(i+1)+': '+step);
 const normal=label(l.example,translated.normal),exception=label(l.exception,translated.exception),action=label(l.action,translated.escalation);
 const paragraphs:Record<string,string[]>={
  understand:[objective,...p.understand,...(primer?[t(primer)]:[]),records],
  roles:[t(g.roles),owner,...p.roles],
  method:steps.flatMap((step,i)=>[step,...(i===0?p.step1:i===1?p.step2:p.step3),i===0?records:i===1?owner:standard]),
  worked:[normal,objective,p.worked[0],...steps,p.worked[1],records,p.worked[2],standard],
  exception:[exception,p.exception[0],action,p.exception[1],owner,p.exception[2]],
  exercise:[translated.practice||'',...p.exercise,owner],
  quality:[standard,p.quality[0],p.quality[1],exception,p.quality[2]],
  teachback:[normal,p.teachback[0],exception,p.teachback[1]],
  recap:[...p.recap,action]
 };
 const chapters=translated.chapters?.map(ch=>paragraphs[ch.id]?{...ch,title:c.headings[ch.id as keyof typeof c.headings],paragraphs:paragraphs[ch.id].filter(Boolean)}:ch);
 const quiz=translated.quiz?.map(q=>({...q,options:[...q.options]}));
 const start=source.quiz?.findIndex(q=>q.q==='What outcome should this lesson enable you to demonstrate?')??-1;
 if(quiz&&start>=0&&quiz.length>=start+9){
  const q=c.questions;const keys=['outcome','firstStep','exception','pending','record','sequence','normal','exceptionActions','submission'] as const;
  keys.forEach((key,i)=>{quiz[start+i].q=key==='exception'?exception+'\n\n'+q[key]:key==='normal'?normal+'\n\n'+q[key]:q[key];});
  quiz[start].options[0]=translated.objective;
  quiz[start+1].options[1]=translated.steps?.[0];
  if('why' in quiz[start+1])quiz[start+1].why=steps[0];
  quiz[start+2].options[2]=translated.escalation;
  quiz[start+4].options[0]=label(c.optionLabels.evidence,t(g.records));
  quiz[start+6].options[1]=label(c.optionLabels.check,t(g.measure));
  quiz[start+8].options[0]=translated.practice;
 }
 return {...translated,chapters,quiz};
}
