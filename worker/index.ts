import handler from 'vinext/server/fetch-handler';
import {accessSettings,accessUser,safeReturn} from '../lib/access-auth';
export default {
 async fetch(request:Request,env:Cloudflare.Env,ctx:ExecutionContext){
  const url=new URL(request.url);
  if(url.pathname==='/signin-with-chatgpt'){
   if(request.method!=='GET')return new Response('Method not allowed',{status:405});
   if(!accessSettings(env))return new Response('Login setup required: configure TEAM_DOMAIN and ACCESS_AUD, then protect this login path with Cloudflare Access. Public lessons are available at /.',{status:503,headers:{'Cache-Control':'no-store'}});
   const user=await accessUser(request.headers,env);
   if(!user)return new Response('No valid login session. Protect /signin-with-chatgpt with a Cloudflare Access Allow policy and disable its Cookie Path Attribute. See README.md.',{status:401,headers:{'Cache-Control':'no-store'}});
   return Response.redirect(new URL(safeReturn(url.searchParams.get('return_to')),url.origin).toString(),302);
  }
  if(url.pathname==='/signout-with-chatgpt')return Response.redirect(url.origin+'/cdn-cgi/access/logout',302);
  return handler.fetch(request,env,ctx);
 }
};
