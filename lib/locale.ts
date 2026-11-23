export const LANGUAGES=[{code:'en',label:'English',intl:'en-IN'},{code:'ta',label:'தமிழ்',intl:'ta-IN'},{code:'hi',label:'हिन्दी',intl:'hi-IN'},{code:'ar',label:'العربية',intl:'ar-AE'}] as const;
export type Language=typeof LANGUAGES[number]['code'];
export function language(value:unknown):Language{return LANGUAGES.some(l=>l.code===value)?value as Language:'en';}
export function requestLanguage(request?:Request):Language{if(!request)return 'en';const cookie=request.headers.get('cookie')?.match(/(?:^|;\s*)joy_language=(en|ta|hi|ar)(?:;|$)/)?.[1];return language(new URL(request.url).searchParams.get('lang')||request.headers.get('X-Joy-Language')||cookie);}
export function formatDate(value:string,lang:Language){if(!value)return '';return new Date(value.length===10?value+'T12:00:00Z':value).toLocaleDateString(LANGUAGES.find(l=>l.code===lang)!.intl,{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Kolkata'});}
