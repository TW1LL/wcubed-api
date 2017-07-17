import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Payment} from '../../models/checkout/order.payment';
import {Context} from 'koa';
import * as Stripe from 'stripe';
import config from '../config';
import {Order} from '../../models/checkout/order';
export default class PaymentController extends ApiController<Payment> {
    stripe: any;
    order: any;
    constructor(db: Connection) {
        super(db, 'payment', Payment);
        this.order = db.getRepository(Order);
        this.stripe = new Stripe(config.get().stripe)
        this.routes = [
            {
                'method': 'post',
                'path': '/payment/purchase',
                fn: this.purchaseOrder
            }
        ];
    }

    purchaseOrder = async (ctx: Context) => {
        const order = await this.order.findOneById(ctx.request.body.purchase.orderId);
        this.stripe.charges.create({
            amount: this.getTotal(order),
            source: ctx.request.body.purchase.stripeToken,
            currency: ctx.request.body.purchase.currency,
            description: order.description
        })
    }

    getTotal(order: Order) {
        let total = 0;
        // Shipment price + product price
        order.items.forEach((item) => {
            total += item.shipment.price + (item.product.price * item.quantity);
        });
        if (order.address.state === 'NJ' || order.address.state === 'New Jersey') {
            total += total * 0.07;
        }
        return total;
    }
}
