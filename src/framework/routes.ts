import * as Router from 'koa-router';
import { IApiController } from '../framework/controllers/api.controller.interface';

interface IRoute {
    path: string;
    controller: IApiController;
}

export interface ICustomRoute {
    method: string;
    path: string,
    fn: any
}
export class Routes {
    routeList: IRoute[];
    constructor(routeList: IRoute[]) {
        this.routeList = routeList;
    }
    setRoutes(router: Router) {
        this.routeList.forEach((route: IRoute) => {
            router.get(route.path, route.controller.getAll);
            router.get(route.path + "/:id", route.controller.get);
            router.post(route.path, route.controller.post);
            router.patch(route.path, route.controller.patch);
            router.delete(route.path, route.controller.delete);
            if(route.controller.customRoutes) {
                route.controller.customRoutes.forEach((route: ICustomRoute) => {
                    if(route.method === "get") {
                        router.get(route.path, route.fn);
                    }
                    if(route.method === "post") {
                        router.post(route.path, route.fn);
                    }
                    if(route.method === "patch") {
                        router.patch(route.path, route.fn);
                    }
                    if(route.method === "delete") {
                        router.delete(route.path, route.fn);
                    }
                })
            }
        });
        return router;
    }
}
