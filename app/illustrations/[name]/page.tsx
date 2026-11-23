import {examples} from '../../../lib/hub-examples';
import IllustrationPage from '../../illustration-page';
export default async function Page({params}:{params:Promise<{name:string}>}){const {name}=await params;const item=examples.find(x=>x.image===name);return <IllustrationPage item={item||null}/>;}
