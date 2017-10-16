import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import * as cors from 'koa2-cors';
import config from './config';
import {db} from './utils/db';
import {logger} from './utils/logger';
import {Routes} from './framework/routes';

const port = process.env.PORT || 3000;

const app = new Koa();
let router = new Router();

app.use(koaBody({ multipart: true }));
app.use(cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token']
}));
const dbConfig = config.get().db;
connect();
function connect() {
    db.connect(dbConfig).then((conn) => {
        router = new Routes(config.routes(conn)).setRoutes(router, conn);
        app.use(router.routes());
        app.listen(port);
        logger.debug('Starting server on port ' + port);
    }).catch((err) => {
        logger.log('Couldn\'t connect to the database.');
    });

}
