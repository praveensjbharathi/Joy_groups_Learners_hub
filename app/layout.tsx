import type { Metadata } from 'next';
import './globals.css';
import {LanguageProvider} from './language';
export const metadata: Metadata = { title: 'Joy Groups · Learning Hub', description: 'People, purpose and practical learning. From joining to growth and beyond.', robots: {index:false,follow:false}, icons:{icon:'/favicon.svg'} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider></body></html>}
