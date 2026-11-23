import {localized,localizedLesson,text as translateText} from '../../../../lib/localization-server';
import {requestLanguage} from '../../../../lib/locale';
import {getChatGPTUser} from '../../../chatgpt-auth';
import {getHub,allUnits,allowedUnit,selfFor} from '../../../../lib/hub-server';
import {deliveryUnits} from '../../../../lib/delivery-learning';
import {ensureState} from '../../../../lib/academy-server';
import {publicQuestion} from '../../../../lib/lesson-model';
import {tracks} from '../../../../lib/hub-content';
import type {AcademyState} from '../../../../lib/types';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{const lang=requestLanguage(request),id=decodeURIComponent(new URL(request.url).pathname.split('/').pop()||''),u=await getChatGPTUser(),hub=await getHub(u),isDelivery=id.startsWith('delivery-');const unit=isDelivery?deliveryUnits.find(x=>x.id===id):allUnits(hub).find(x=>x.id===id);if(!unit)return Response.json({error:'Lesson not found.'},{status:404});if(!isDelivery&&!allowedUnit(hub,u,id))return Response.json({error:'This lesson needs an authorised assigned account.'},{status:403,headers:{'Cache-Control':'no-store'}});let assigned=false,memberId='',revision=hub.revision,history:any[]=[],cycle=1;const hm=u?selfFor(hub,u):null;
 if(isDelivery){const row=u?await ensureState(u):null;const a:AcademyState|null=row?JSON.parse(row.payload):null;const m=a?.members.find(m=>m.email===u?.email||!!u?.userId&&m.userId===u.userId);assigned=!!m?.assigned.includes(id.replace('delivery-',''))&&hm?.status!=='Exited';memberId=m?.id||'';revision=row?.revision||0;cycle=m?.cycle||1;history=a?.attempts.filter(x=>x.member===m?.id&&x.module===id.replace('delivery-',''))||[];}else{assigned=!!hm&&hm.status!=='Exited'&&hm.tracks.includes(unit.track);memberId=hm?.id||'';cycle=hub.cycles[memberId+':'+id]||1;history=hub.attempts.filter(x=>x.member===memberId&&x.module===id);}
 const siblings=isDelivery?deliveryUnits:allUnits(hub).filter(x=>x.track===unit.track&&allowedUnit(hub,u,x.id));const index=siblings.findIndex(x=>x.id===id);
 return Response.json({lesson:localizedLesson({...unit,quiz:unit.quiz.map(publicQuestion)},lang),kind:isDelivery?'delivery':'hub',assigned,memberId,revision,cycle,history,signedIn:!!u,course:translateText(tracks.find(t=>t.id===unit.track)?.title||'Product Delivery Academy',lang),previous:siblings[index-1]?localized({id:siblings[index-1].id,title:siblings[index-1].title},lang):null,next:siblings[index+1]?localized({id:siblings[index+1].id,title:siblings[index+1].title},lang):null},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'The lesson could not load. Please retry.'},{status:503,headers:{'Cache-Control':'no-store'}})}}
