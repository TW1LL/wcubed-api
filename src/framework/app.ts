import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as Router from 'koa-router';
import config from '../app/config';
import {db} from '../utils/db';
import {logger} from '../utils/logger';
import {Routes} from './routes';

const app = new Koa();
let router = new Router();
app.use(koaBody());
db.connect(config.get().db).then((conn) => {
    router = new Routes(config.routes(conn)).setRoutes(router);
    app.use(router.routes());
    app.listen(port);
    logger.debug('Starting server on port ' + port);
});

const port = process.env.PORT || 3000;
