"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_controller_1 = require("./controllers/product.controller");
var routes_1 = require("../utils/routes");
exports.routes = new routes_1.Routes([
    {
        path: "/product",
        controller: new product_controller_1.default()
    }
]);
