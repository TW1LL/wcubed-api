import { Product } from '../models/product';
import { ApiController } from '../../framework/controllers/api.controller';
import { logger } from '../../utils/logger';
import Client, { CouchDoc } from "davenport";


export default class ProductController extends ApiController<Product> {
    constructor() {
        super('products');
        
    }
    
}