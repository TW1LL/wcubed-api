"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Routes = (function () {
    function Routes(routeList) {
        this.routeList = routeList;
    }
    Routes.prototype.setRoutes = function (router) {
        this.routeList.forEach(function (route) {
            router.get(route.path, route.controller.getAll);
            router.get(route.path + "/:id", route.controller.get);
            router.post(route.path, route.controller.post);
            router.patch(route.path, route.controller.patch);
            router.delete(route.path, route.controller.delete);
        });
        return router;
    };
    return Routes;
}());
exports.Routes = Routes;
