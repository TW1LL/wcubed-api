import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Order} from '../../models/checkout/order';
export default class OrderController extends ApiController<Order> {
    constructor(db: Connection) {
        super(db, 'orders', Order);
    }
}
