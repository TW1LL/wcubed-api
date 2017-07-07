import {Routes} from '../framework/routes';
import OrderController from './controllers/order.controller';
import ProductController from './controllers/product.controller';

export const routes = new Routes([
        {
            path: '/product',
            controller: new ProductController()
        },
        {
            path: '/order',
            controller: new OrderController()
        }
]);
