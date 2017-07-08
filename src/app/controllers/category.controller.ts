import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Category} from '../models/cart/category';

export default class CategoryController extends ApiController<Category> {
    constructor(db: Connection) {
        super(db, 'category', Category);
    }
}
