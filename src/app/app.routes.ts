import ProductController from './controllers/product.controller';
import { Routes } from '../framework/routes';



export const routes = new Routes([
        {
            path: "/product",
            controller: new ProductController()
        }
]);
