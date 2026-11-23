// Compatibility names retain existing route and business-module imports.
// Self-hosted identity comes ONLY from a cryptographically verified Access JWT.
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {env} from 'cloudflare:workers';
import {accessUser,safeReturn,type AccessUser} from '../lib/access-auth';
export type ChatGPTUser=AccessUser;
export async function getChatGPTUser():Promise<ChatGPTUser|null>{return accessUser(await headers(),env);}
export async function requireChatGPTUser(returnTo:string){const user=await getChatGPTUser();if(user)return user;redirect(chatGPTSignInPath(returnTo));}
export function chatGPTSignInPath(returnTo:string){return '/signin-with-chatgpt?return_to='+encodeURIComponent(safeReturn(returnTo));}
export function chatGPTSignOutPath(returnTo='/'){return '/signout-with-chatgpt?return_to='+encodeURIComponent(safeReturn(returnTo));}
