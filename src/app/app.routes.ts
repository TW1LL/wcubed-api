import ProductController from './controllers/product.controller';
import { Routes } from '../utils/routes';



export const routes = new Routes([
        {
            path: "/product",
            controller: new ProductController()
        }
]);
