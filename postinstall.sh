sed -i -e "/^interface Request extends BaseRequest {$/a"$;\\\n'"body: any;"'\n' node/modules/@types/koa/index.d.ts
sed -i "var regeneratorRuntime=require('regenerator-runtime/runtime');" node_modules/@easypost/api/easypost.js
## edit @easypost/api/easypost.js
##### add 'var regeneratorRuntime=require('regenerator-runtime/runtime');' at the very beginning
node src/models/index.js
tsc
