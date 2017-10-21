import {Context} from 'koa';
import {Connection} from 'typeorm';
import {logger} from '../utils/logger';
import * as fs from 'fs';
const exec = require('child_process').exec;

export function deploy(ctx: Context, db: Connection) {
    ctx.body = {
        result: 'Trying to deploy...'
    };
    logger.log('Received deployment call.');
    db.close().then(() => {
        logger.log('Closed Connection to database.');
        logger.log('Running deploy script.');
        var stdout = exec('sh init/deploy.sh', function(error, stdout, stderror) {
            logger.log(stdout);
            logger.log(stderror);
            if (error) {
                logger.log(error);
            }
            var second = exec('pm2 restart app');
        });
    });

}


export function deploySpa(ctx: Context) {
    ctx.body = {
        result: 'Deploying new SPA'
    };
    logger.log('Received spa deployment call');
    exec('sh init/deploy-spa.sh', function(error, stdout, stderror) {
       logger.log(stdout);
       logger.error(stderror);
       if (error) {
           logger.error(error);
       }
       else if (!fs.existsSync("/var/node/wcubed-spa/dist")){
           logger.error("Distribution directory doesn't exist")
       }
       else {
           exec('sh init/cp-spa.sh', function (error, stdout, stderror) {
               logger.log(stdout);
               logger.error(stderror);
               if (error) {
                   logger.error(error);
               }
               else if (!stderror){
                   logger.log("Successfully Deployed");
               }
           });
       }
    });


}