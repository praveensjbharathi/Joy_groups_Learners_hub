import type {HubMember} from './hub-types';
export const MANDATORY_TRACKS=['mandatory-coc','law-india','law-uae'];
export function requiredTracks(country:string){return ['mandatory-coc',...(country==='India'?['law-india']:country==='UAE'?['law-uae']:[])];}
export function requiredFor(country:string,unit:{track:string;mandatory?:boolean;country?:string;company?:string;policyId?:string},company=''){if(unit.policyId)return (unit.country==='All'||unit.country===country)&&(unit.company==='Joy Groups'||unit.company===company);return requiredTracks(country).includes(unit.track)&&unit.mandatory!==false;}
export function enforceRequired(m:HubMember){m.tracks=[...new Set(['foundation',...requiredTracks(m.country),...m.tracks])];return m;}
