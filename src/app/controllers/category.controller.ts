import {Context} from 'koa';
import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Category} from '../models/cart/category';
export default class CategoryController extends ApiController<Category> {
    constructor(db: Connection) {
        super(db, 'category', Category);
        this.customRoutes = [{
            method: 'get',
            path: '/category/cnc',
            fn: this.cnc
        }];
    }

    public cnc = async (ctx: Context) => {
        ctx.body = await this.query(true).where(this.where('name', 'CNC Products')).getOne();
    }
}
