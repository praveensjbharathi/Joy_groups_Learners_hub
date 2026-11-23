import {env} from 'cloudflare:workers';
import type {ChatGPTUser} from '../app/chatgpt-auth';
import type {HubState,HubNotice} from './hub-types';
import {getHub,saveHub,audit,now,providerStatus} from './hub-server';
export async function dispatchQueued(s:HubState,u:ChatGPTUser,origin:string){
 const configured=providerStatus(),day=now().slice(0,10);
 const used=s.notices.reduce((n,x)=>n+(x.attemptLog||[]).filter(t=>t.slice(0,10)===day).length,0);
 const chosen=s.notices.filter(n=>['Pending','Blocked','Failed'].includes(n.status)&&['email','sms','whatsapp'].includes(n.channel)&&n.attempts<3&&s.config[n.channel as 'email'|'sms'|'whatsapp'].enabled&&configured[n.channel as 'email'|'sms'|'whatsapp']).slice(0,Math.max(0,Math.min(10,s.config.budget-used)));
 for(const n of chosen){n.status='Sending';n.attempts++;n.attemptLog=[...(n.attemptLog||[]),now()];}
 audit(s,u,'notification dispatch claimed',String(chosen.length));
 if(!await saveHub(s,s.revision))throw Object.assign(new Error('Another update was saved. Refresh and try again.'),{status:409});
 const results:HubNotice[]=[];
 for(const n of chosen){const m=s.members.find(m=>m.id===n.member)!;const e=env as any,link=new URL('/',origin).href;let res:Response|undefined;let requested=false;
 try{if(n.channel==='email'){
 if(!s.config.email.from)throw new Error('Sender required');requested=true;
 res=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+e.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':n.id},body:JSON.stringify({from:s.config.email.from,to:[m.email],subject:'Joy Groups: '+n.event,text:n.detail+'\nOpen your secure hub: '+link}),signal:AbortSignal.timeout(12000)});
 }else if(n.channel==='sms'){
 if(!/^\+[1-9]\d{7,14}$/.test(m.profile['Phone']||'')||!s.config.sms.from)throw new Error('Sender or international phone required');requested=true;
 res=await fetch(`https://api.twilio.com/2010-04-01/Accounts/${e.TWILIO_ACCOUNT_SID}/Messages.json`,{method:'POST',headers:{Authorization:'Basic '+btoa(e.TWILIO_ACCOUNT_SID+':'+e.TWILIO_AUTH_TOKEN),'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({From:s.config.sms.from,To:m.profile['Phone'],Body:'Joy Groups: '+n.event+'. Open your Learning Hub: '+link}),signal:AbortSignal.timeout(12000)});
 }else{
 if(!s.config.whatsapp.phoneId||!s.config.whatsapp.template||!/^\+?[1-9]\d{7,14}$/.test(m.profile['WhatsApp']||'')||!s.declarations.some(d=>d.member===m.id&&d.kind==='Notification consent'&&d.value==='WhatsApp opted in'))throw new Error('WhatsApp configuration or opt-in required');requested=true;
 const version=/^v\d+\.\d+$/.test(e.WHATSAPP_API_VERSION||'')?e.WHATSAPP_API_VERSION:'v27.0';
 res=await fetch(`https://graph.facebook.com/${version}/${encodeURIComponent(s.config.whatsapp.phoneId)}/messages`,{method:'POST',headers:{Authorization:'Bearer '+e.WHATSAPP_ACCESS_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({messaging_product:'whatsapp',to:m.profile['WhatsApp'].replace('+',''),type:'template',template:{name:s.config.whatsapp.template,language:{code:s.config.whatsapp.language}}}),signal:AbortSignal.timeout(12000)});
 }
 if(res.ok){const body:any=await res.json().catch(()=>({}));n.status='Sent';n.providerId=body.id||body.sid||body.messages?.[0]?.id||'Provider accepted';}
 else n.status=res.status>=500?'Needs review':'Failed';
 }catch{n.status=requested?'Needs review':'Blocked';}
 results.push(n);
 }
 // Merge results into the latest revision; provider calls are never repeated on a save conflict.
 for(let attempt=0;attempt<3;attempt++){const latest=await getHub(u);for(const result of results){const n=latest.notices.find(n=>n.id===result.id);if(n)Object.assign(n,result)}if(await saveHub(latest,latest.revision))return {accepted:results.filter(n=>n.status==='Sent').length,attempted:results.length};}
 return {accepted:results.filter(n=>n.status==='Sent').length,attempted:results.length,warning:'Dispatch results need reconciliation. Claimed records remain locked against duplicate sending.'};
}
