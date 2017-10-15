import {Context} from 'koa';
const exec = require('child_process').execSync;

export function deploy(ctx: Context) {
    const stdout = exec('sh init/deploy.sh').toString();
    ctx.body = {
        result: stdout
    };
}