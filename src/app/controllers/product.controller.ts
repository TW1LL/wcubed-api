import {ApiController} from '../../framework/controllers/api.controller';
import {Product} from '../models/cart/product';

export default class ProductController extends ApiController<Product> {
    constructor() {
        super('products');
    }
}
