import { requireChatGPTUser, chatGPTSignOutPath } from '../chatgpt-auth';
import { ensureState, OWNER_EMAIL } from '../../lib/academy-server';
import type { AcademyState } from '../../lib/types';
import { redirect } from 'next/navigation';
import { getHub } from '../../lib/hub-server';
export const dynamic='force-dynamic';
export default async function TeamAccess(){
 const user=await requireChatGPTUser('/team');
 const row=await ensureState(user);
 const state:AcademyState|null=row?JSON.parse(row.payload):null;
 const member=state?.members.find(m=>(!!user.userId&&m.userId===user.userId)||m.email.toLowerCase()===user.email.toLowerCase());
 const hub=await getHub(user);
 if(user.email.toLowerCase()===OWNER_EMAIL||member||hub.members.some(m=>m.email===user.email))redirect('/');
 return <main className="account-page"><section className="panel"><span className="eyebrow">JOY GROUPS / TEAM ACCESS</span><h1>You are signed in.</h1><p>Your ChatGPT account <strong>{user.email}</strong> is recognized. It has not yet been assigned a learning plan.</p><p>Ask the training lead to add this exact email in <strong>People → Invite employee</strong>. Your team records will appear once you are enrolled.</p><div className="account-actions"><a className="btn primary" href="/" target="_top">Continue public learning</a><a className="btn secondary" href={chatGPTSignOutPath('/team')} target="_top">Use a different account</a></div></section></main>;
}
