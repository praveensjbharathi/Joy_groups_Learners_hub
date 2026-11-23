import { initialFacts, modules } from './content';
import type { AcademyState } from './types';
import type { ChatGPTUser } from '../app/chatgpt-auth';
export function publicAcademy(user:ChatGPTUser|null=null){
 const state:AcademyState={members:[{id:'public-visitor',name:'Public visitor',email:'',role:'Self-guided learning',path:'Public learning',assigned:modules.map(m=>m.id),due:'',cycle:1,joined:''}],reads:[],attempts:[],demos:[],facts:initialFacts,actions:[],topics:[],reviews:[],worksheets:[]};
 return {state,revision:0,manager:false,publicView:true,signedIn:!!user,needsEnrollment:!!user,user:user?{name:user.displayName,email:user.email,id:user.userId}: {name:'Public visitor',email:'',id:''},memberId:'public-visitor'};
}
