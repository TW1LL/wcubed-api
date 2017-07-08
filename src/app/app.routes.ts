import {Connection} from 'typeorm';
import CategoryController from './controllers/category.controller';
import OrderController from './controllers/order.controller';
import ProductController from './controllers/product.controller';

export const routes = (db: Connection) => [
    {
        path: '/product',
        controller: new ProductController(db)
    },
    {
        path: '/order',
        controller: new OrderController(db)
    },
    {
        path: '/category',
        controller: new CategoryController(db)
    }
];
