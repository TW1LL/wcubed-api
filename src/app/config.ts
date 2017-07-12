import * as fs from 'fs';
import {UserController} from '../framework/controllers/user.controller';
import {User} from '../models/account/user';
import {UserAuth} from '../models/account/user.auth';
import CategoryController from './controllers/category.controller';
import OrderController from './controllers/order.controller';
import ProductController from './controllers/product.controller';
import {Category} from '../models/cart/category';
import {Product} from '../models/cart/product';
import {Address} from '../models/checkout/address';
import {Order} from '../models/checkout/order';
import {OrderItem} from '../models/checkout/order.item';

class Config {
    private config: any;
    public get() {
        if (this.config) {
            return this.config;
        }
        const cfg = JSON.parse(fs.readFileSync('./config.json').toString());
        cfg.db.autoSchemaSync = true;

        // Database name
        cfg.db.database = 'wcubed';

        // All of the database models
        cfg.db.entities = [
            Product,
            Category,
            OrderItem,
            Order,
            User,
            UserAuth,
            Address];

        // Routes for controllers of models
        cfg.routes = [
            {
                path: '/product',
                controller: ProductController
            },
            {
                path: '/order',
                controller: OrderController
            },
            {
                path: '/category',
                controller: CategoryController
            },
            {
                path: '/user',
                controller: UserController
            }
            ];
        cfg.db.logging = { logOnlyFailedQueries: true, logFailedQueryError: true };

        this.config = cfg;
        return cfg;
    }

    public routes(db) {
        this.config.routes = this.config.routes.map((route) => {
            return {
                path: route.path,
                controller: new route.controller(db)
            };
        });
        return this.config.routes;
    }
}
const config = new Config();
export default config;
