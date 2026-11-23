import Academy from '../academy';
import {modules,products,sources} from '../../lib/content';
export const dynamic='force-dynamic';
export default function Delivery(){return <Academy modules={modules.map(m=>({...m,quiz:m.quiz.map(q=>({q:q.q,options:q.options}))}))} products={products} sources={sources}/>;}
