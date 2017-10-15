import {Context} from 'koa';
const exec = require('child_process').exec;

export function deploy(ctx: Context) {
    const stdout = exec('sh init/deploy.sh');
    ctx.body = {
        result: 'Deploying...'
    };
}