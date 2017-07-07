import * as Router from 'koa-router';
import { IApiController } from '../app/controllers/interfaces/iapi.controller';

interface IRoute {
    path: string;
    controller: IApiController;
}
export class Routes {
    routeList: IRoute[];
    constructor(routeList: IRoute[]) {
        this.routeList = routeList;
    }
    setRoutes(router: Router) {
        this.routeList.forEach(route => {
            router.get(route.path, route.controller.getAll);
            router.get(route.path + "/:id", route.controller.get);
            router.post(route.path, route.controller.post);
            router.patch(route.path, route.controller.patch);
            router.delete(route.path, route.controller.delete);
        });
        return router;
    }
}
