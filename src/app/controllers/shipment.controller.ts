import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import * as ezPost from '@easypost/api/easypost';
import {OrderShipment} from '../../models/checkout/order.shipment';
import {Context} from 'koa';
import {Address} from '../../models/checkout/address';
const EasyPost = ezPost.default;
export default class ShipmentController extends ApiController<OrderShipment> {
    api: any;
    fromAddress: Address;
    constructor(db: Connection) {
        super(db, 'orders', OrderShipment);
        this.api = new EasyPost('MAPtk5js7AiUyljC6i8yEw');
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
        const body = ctx.request.body;
        let shipments = [];
        for(let i = 0; i < body.length; i++) {
            const ship = new this.api.Shipment({
                to_address:     new this.api.Address(body[i].toAddress),
                from_address:   new this.api.Address(this.fromAddress),
                parcel:         new this.api.Parcel(body[i].parcel)
            });
            shipments.push(await ship.save());
        }
        ctx.body = shipments;
    }

    buyShipments = async (ctx: Context) => {
        const body = ctx.request.body;
        let shipments = [];
        for(let i = 0; i< body.length; i++) {
            shipments.push(await this.api.Shipment.retrieve(body.shipment[i].id).buy(body.shipment[i].rateId));
        }
        ctx.body = shipments.map((shipment) => ({
            id: shipment.id,
            label: shipment.postage_label,
            rate: shipment.selected_rate,
            tracking: shipment.tracker
        }));;

    }

}
