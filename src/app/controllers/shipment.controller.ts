import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import * as ezPost from '@easypost/api/easypost';
import {OrderShipment} from '../../models/checkout/order.a.shipment';
import {Context} from 'koa';
import {Address} from '../../models/checkout/address';
import {logger} from '../../utils/logger';
import config from '../../config';
import {Order} from '../../models/checkout/order';
const EasyPost = ezPost.default;

export default class ShipmentController extends ApiController<OrderShipment> {
    api: any;
    order: any;
    fromAddress: Address = {
        "mode": "test",
        "street1": "12 Hawk Dr",
        "city": "West Windsor",
        "state": "NJ",
        "zip": "08550",
        "country": "USA",
        "residential": false,
        "email": "orders@wcubed.co",
        "name": "Andrew Wagner"

    };
    constructor(db: Connection) {
        super(db, 'orders', OrderShipment);
        this.order = db.getRepository(Order);
        this.api = new EasyPost(config.get().easypost);
        this.routes = [
            {
                path: '/shipment/create',
                method: 'post',
                fn: this.createShipments

            },
            {
                path: '/shipment/buy',
                method: 'post',
                fn: this.buyShipments
            }
        ]
    }

    createShipments = async (ctx: Context) => {
        const body = ctx.request.body.shipments;
        let shipments = [];
        for(let i = 0; i < body.length; i++) {
            const to_address = new this.api.Address(body[i].toAddress);
            const from_address = new this.api.Address(this.fromAddress);
            const parcel = new this.api.Parcel(body[i].parcel);
            const ship = new this.api.Shipment({
                to_address:     to_address,
                from_address:   from_address,
                parcel:         parcel
            });
            shipments.push(ship.save());
        }

        await Promise.all(shipments).then(ships => {
            logger.log('API >> CREATE SHIPMENTS SUCCESS');
            ctx.body = ships;
        }).catch(err => {
            logger.log('API >> CREATE SHIPMENTS ERROR');
            logger.error(err);
            ctx.body = err;
        });

    }

    buyShipments = async (ctx: Context) => {
        const body: OrderShipment[] = ctx.request.body.shipments;
        let shipments = [];
        for(let i = 0; i< body.length; i++) {
            shipments.push(this.api.Shipment.retrieve(body[i].shipmentId));
        }
        await Promise.all(shipments).then(async (ships) => {
            let buys = [];
            for(let i = 0; i < ships.length; i++) {
                buys.push(ships[i].buy(body[i].rateId));
            }
            await Promise.all(buys).then(async (shipment) => {
                const query = this.order.createQueryBuilder('orders');
                const order = await this.join(query, 'orders', Order).where('orders.id = ' + ctx.request.body.orderId).getOne();
                order.items = order.items.map((item) => {
                    const ship = shipment.find(sh => sh.id == item.shipment.shipmentId);
                    item.shipment.label = ship.postage_label.label_url;
                    item.shipment.tracking = ship.tracker.tracking_code;
                    item.shipment.carrier = ship.selected_rate.carrier;
                    item.shipment.service = ship.selected_rate.service;
                    item.shipment.price = ship.rate;
                    return item;
                })
                logger.log('SHIPMENTS >> BOUGHT');
                ctx.body = await this.order.persist(order);
            });
        })

    }

}
