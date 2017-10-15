cd wcubed-api
npm install
## edit @types/koa/index.d.ts -
##### add 'body: any;' to 'interface Request extends BaseRequest {' at around line 626
## edit @easypost/api/easypost.js
##### add 'var regeneratorRuntime=require('regenerator-runtime/runtime');' at the very beginning
node src/models/index.js
tsc
