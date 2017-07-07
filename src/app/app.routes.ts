import {Routes} from '../framework/routes';
import ProductController from './controllers/product.controller';

export const routes = new Routes([
        {
            path: '/product',
            controller: new ProductController()
        }
]);
