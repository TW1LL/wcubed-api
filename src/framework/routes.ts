import * as Router from 'koa-router';
import {IApiController} from './controllers/api.controller.interface';
import {deploy, deploySpa} from './deploy';
import {Connection} from 'typeorm';
import {upload} from './upload';
interface IRoute {
    path: string;
    controller: IApiController;
}

export interface ICustomRoute {
    method: string;
    path: string;
    fn: any;
}
export class Routes {
    public routeList: IRoute[];
    constructor(routeList: IRoute[]) {
        this.routeList = routeList;
    }
    public setRoutes(router: Router, db: Connection) {
        this.routeList.forEach((route: IRoute) => {
            router.get(route.path, route.controller.getAll);
            router.get(new RegExp(route.path + '/([0-9]+)'), route.controller.get);
            router.post(route.path, route.controller.post);
            router.patch(route.path, route.controller.patch);
            router.delete(new RegExp(route.path + '/([0-9]+)'), route.controller.delete);
            if (route.controller.routes) {
                route.controller.routes.forEach((rte: ICustomRoute) => {
                    if (rte.method === 'get') {
                        router.get(rte.path, rte.fn);
                    }
                    if (rte.method === 'post') {
                        router.post(rte.path, rte.fn);
                    }
                    if (rte.method === 'patch') {
                        router.patch(rte.path, rte.fn);
                    }
                    if (rte.method === 'delete') {
                        router.delete(rte.path, rte.fn);
                    }
                });
            }
        });
        router.post('/upload/:type', (ctx) => {upload(ctx, db)});
        router.post('/deploy', (ctx) => {deploy(ctx, db)});
        router.post('/deploy-spa', deploySpa);
        return router;
    }
}
