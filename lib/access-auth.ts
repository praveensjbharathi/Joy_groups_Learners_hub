import {createRemoteJWKSet,jwtVerify,type JWTVerifyGetKey} from 'jose';
export type AccessConfig={TEAM_DOMAIN?:string;ACCESS_AUD?:string};
export type AccessUser={userId:string;displayName:string;email:string;fullName:string|null};
const keySets=new Map<string,ReturnType<typeof createRemoteJWKSet>>();
export function accessSettings(config:AccessConfig){
 const issuer=(config.TEAM_DOMAIN||'').replace(/\/$/,'');
 if(!/^https:\/\/[a-z0-9-]+\.cloudflareaccess\.com$/i.test(issuer)||!config.ACCESS_AUD?.trim())return null;
 return {issuer,audience:config.ACCESS_AUD.trim()};
}
export async function verifyAccessToken(token:string,config:AccessConfig,testKeySet?:JWTVerifyGetKey):Promise<AccessUser|null>{
 const settings=accessSettings(config);if(!settings||token.length>32768)return null;
 try{
  let keys=testKeySet||keySets.get(settings.issuer);
  if(!keys){keys=createRemoteJWKSet(new URL(settings.issuer+'/cdn-cgi/access/certs'));keySets.set(settings.issuer,keys as ReturnType<typeof createRemoteJWKSet>);}
  const {payload}=await jwtVerify(token,keys,{...settings,algorithms:['RS256'],requiredClaims:['exp','sub','email','aud','iss']});
  if(payload.type!=='app'||typeof payload.sub!=='string'||!payload.sub||typeof payload.email!=='string'||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()))return null;
  const email=payload.email.trim().toLowerCase(),name=typeof payload.name==='string'?payload.name:null;
  return {userId:payload.sub,displayName:name||email,email,fullName:name};
 }catch{return null;}
}
export function accessToken(headers:Headers):string|null{
 const assertion=headers.get('cf-access-jwt-assertion');if(assertion)return assertion;
 const values=(headers.get('cookie')||'').split(';').map(x=>x.trim()).filter(x=>x.startsWith('CF_Authorization='));
 return values.length===1?values[0].slice('CF_Authorization='.length):null;
}
export async function accessUser(headers:Headers,config:AccessConfig){const token=accessToken(headers);return token?verifyAccessToken(token,config):null;}
export function safeReturn(value:string|null){
 if(!value?.startsWith('/')||value.startsWith('//'))return '/';
 try{const u=new URL(value,'https://local.invalid');return u.origin==='https://local.invalid'&&!['/signin-with-chatgpt','/signout-with-chatgpt','/callback'].includes(u.pathname)?u.pathname+u.search+u.hash:'/';}catch{return '/';}
}
