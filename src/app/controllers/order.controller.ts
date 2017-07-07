import {Context} from 'koa';
import {ApiController} from '../../framework/controllers/api.controller';
import {Order} from '../models/checkout/order';

export default class OrderController extends ApiController<Order> {
    constructor() {
        super('orders');
        this.customRoutes = [{
            method: 'get',
            path: '/order/show',
            fn: (ctx: Context) => {ctx.body = new Order(); }
        }];
    }
}
