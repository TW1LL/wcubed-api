import {Context} from 'koa';
import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Category} from '../../models/cart/category';
export default class CategoryController extends ApiController<Category> {
    constructor(db: Connection) {
        super(db, 'category', Category);
        this.routes = [{
            method: 'get',
            path: '/category/cnc',
            fn: this.cnc
        },
        {
            method: 'get',
            path: '/category/pb',
            fn: this.paintball
        }];
    }

    public cnc = async (ctx: Context) => {
        ctx.body = await this.query(true).where(this.whereEqual('name', 'CNC Products')).andWhere(this.column('deleted') + '<> 1').getOne();
    }

    public paintball = async (ctx: Context) => {
        ctx.body = await this.query(true).where(this.whereEqual('name', 'Paintball Products')).andWhere(this.column('deleted') + '<> 1').getOne();
    }

}
