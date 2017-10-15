import {Context} from 'koa';
const exec = require('child_process').exec;

export function deploy(ctx: Context) {
    ctx.body = {
        result: 'Trying to deploy...'
    }
    console.log('Deploying...');
    var stdout = exec('sh init/deploy.sh', function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        if (error) {
            console.log(error);
        }
    });

}