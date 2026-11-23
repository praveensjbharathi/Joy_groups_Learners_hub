import {localized,localizedLesson} from '../../../lib/localization-server';
import {requestLanguage} from '../../../lib/locale';
import {deliveryUnits} from '../../../lib/delivery-learning';
import {grade,validAnswers} from '../../../lib/lesson-model';
export const dynamic='force-dynamic';
export async function POST(request:Request){try{if(request.headers.get('sec-fetch-site')==='cross-site')return Response.json({error:'Cross-site requests are blocked.'},{status:403});const text=await request.text();if(text.length>10000)return Response.json({error:'Request too large.'},{status:413});const d=JSON.parse(text),m=deliveryUnits.find(x=>x.id==='delivery-'+d.module);if(!m)return Response.json({error:'Module not found.'},{status:404});if(!validAnswers(m.quiz,d.answers))return Response.json({error:'Answer every current question.'},{status:400});return Response.json(localized(grade(localizedLesson(m,requestLanguage(request)).quiz,d.answers),requestLanguage(request)),{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'Invalid assessment request.'},{status:400})}}
