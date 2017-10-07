import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Payment} from '../../models/checkout/order.payment';
import {Context} from 'koa';
import * as Stripe from 'stripe';
import config from '../config';
import {Order} from '../../models/checkout/order';
import {logger} from '../../utils/logger';
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
        const query = this.order.createQueryBuilder('orders');
        const order = await this.join(query, 'orders', Order).where('orders.id = ' + ctx.request.body.orderId).getOne();
        const purchase = await this.stripe.charges.create({
            amount: this.getTotal(order) * 100,
            source: order.payment.stripeToken,
            currency: order.payment.currency,
            description: order.description
        });
        logger.log('PURCHASE >> CHARGED');
        const payment = await  this.db.findOneById(order.payment.id);
        payment.balanceTrans = purchase.balance_transaction;
        payment.paymentId = purchase.id;
        payment.amount = purchase.amount;
        payment.paid = true;
        await this.db.persist(payment);
        order.payment = payment;

        ctx.body = await order;
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
        return Math.round(total);
    }
}
