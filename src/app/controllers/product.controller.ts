import { Product } from '../models/cart/product';
import { ApiController } from '../../framework/controllers/api.controller';

export default class ProductController extends ApiController<Product> {
    constructor() {
        super('products');
        
    }
    
}