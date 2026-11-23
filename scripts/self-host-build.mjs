import {spawnSync} from 'node:child_process';
for(const args of [['scripts/i18n/prepare.mjs'],['node_modules/vinext/dist/cli.js','build']]){const r=spawnSync(process.execPath,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status)process.exit(r.status);}
