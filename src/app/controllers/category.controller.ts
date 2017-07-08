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
            fn: async (ctx: Context) => {
                let query = this.db.createQueryBuilder(this.name);
                if (this.type.joins) {
                    this.type.joins.forEach((join) => {
                        query = query.innerJoinAndSelect(this.name + '.' + join, join);
                    });
                }
                query.where(this.name + '.name = "CNC Products"');
                ctx.body = await query.getOne();
            }
        }];
    }
}
