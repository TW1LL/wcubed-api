import * as Koa from 'koa';
import * as Router from 'koa-router';
import { routes }  from './app.routes';
import { logger } from '../utils/logger';
import * as koaBody from 'koa-body';

const app = new Koa();
let router = new Router();
app.use(koaBody());
router = routes.setRoutes(router);
app.use(router.routes());

app.listen(process.env.PORT);
logger.debug('Starting server on port ' + process.env.PORT);