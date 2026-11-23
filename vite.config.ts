import vinext from 'vinext';
import {defineConfig} from 'vite';
import {cloudflare} from '@cloudflare/vite-plugin';
// Uses the pinned Vite-plugin v1/Wrangler deployment format in this ZIP.
export default defineConfig({plugins:[vinext(),cloudflare({viteEnvironment:{name:'rsc',childEnvironments:['ssr']},inspectorPort:false})]});
