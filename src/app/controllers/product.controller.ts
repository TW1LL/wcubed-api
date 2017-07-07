import { Product } from '../models/product';
import { IApiController } from '../controllers/interfaces/iapi.controller';
import { ApiController } from '../controllers/api.controller';
import { Context } from 'koa';
import { logger } from '../../utils/logger';
import Client, { CouchDoc } from "davenport";


export default class ProductController extends ApiController<Product> implements IApiController {
    constructor() {
        super('products');
    }
    
}