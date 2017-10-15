import {Context} from 'koa';
import {Connection} from 'typeorm';
const exec = require('child_process').exec;

export function deploy(ctx: Context, db: Connection) {
    ctx.body = {
        result: 'Trying to deploy...'
    };
    console.log('Received deployment call.');
    db.close().then(() => {
        console.log('Closed Connection to database.');
        console.log('Running deploy script.');
        var stdout = exec('sh init/deploy.sh', function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (error) {
                console.log(error);
            }
        });
    });

}