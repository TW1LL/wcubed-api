import * as Router from 'koa-router';
import {logger} from '../utils/logger';
import {IApiController} from './controllers/api.controller.interface';

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
    public setRoutes(router: Router) {
        this.routeList.forEach((route: IRoute) => {
            router.get(route.path, route.controller.getAll);
            router.get(route.path + '/:id', route.controller.get);
            router.post(route.path, route.controller.post);
            router.patch(route.path, route.controller.patch);
            router.delete(route.path, route.controller.delete);
            if (route.controller.customRoutes) {
                route.controller.customRoutes.forEach((rte: ICustomRoute) => {
                    if (rte.method === 'get') {
                        logger.debug(rte);
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
        return router;
    }
}
