import {Context} from 'koa';
import {Connection} from 'typeorm';
import {logger} from './utils/logger';
const exec = require('child_process').exec;

export function deploy(ctx: Context, db: Connection) {
    ctx.body = {
        result: 'Trying to deploy...'
    };
    logger.log('Received deployment call.');
    db.close().then(() => {
        logger.log('Closed Connection to database.');
        logger.log('Running deploy script.');
        var stdout = exec('sh init/deploy.sh', function(stdout) {
            logger.log(stdout);
            var second = exec('pm2 restart app');
        });
    });

}