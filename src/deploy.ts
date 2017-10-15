import {Context} from 'koa';
const exec = require('child_process').exec;

export function deploy(ctx: Context) {
    var stdout = exec('git pull', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error) {
            console.log(error);
        }
    });
    ctx.body = {
        result: 'Trying to deploy...'
    }
}