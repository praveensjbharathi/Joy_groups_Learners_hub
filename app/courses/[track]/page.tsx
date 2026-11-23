import CoursePage from '../../course-page';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{track:string}>}){const {track}=await params;return <CoursePage trackId={track}/>}
