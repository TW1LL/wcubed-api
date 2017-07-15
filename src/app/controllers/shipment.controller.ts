import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import * as ezPost from '@easypost/api/easypost';
import {OrderShipment} from '../../models/checkout/order.shipment';
import {Context} from 'koa';
import {Address} from '../../models/checkout/address';
import {logger} from '../../utils/logger';
const EasyPost = ezPost.default;
export default class ShipmentController extends ApiController<OrderShipment> {
    api: any;
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
        const body = ctx.request.body.shipments;
        let shipments = [];
        logger.log('getting shipments');
        for(let i = 0; i < body.length; i++) {
            const to_address = new this.api.Address(body[i].toAddress);
            const from_address = new this.api.Address(this.fromAddress);
            const parcel = new this.api.Parcel(body[i].parcel);
            logger.log(parcel);
            const ship = new this.api.Shipment({
                to_address:     to_address,
                from_address:   from_address,
                parcel:         parcel
            });
            shipments.push(ship.save());
        }
        logger.log('awaiting shipments...');
        await Promise.all(shipments).then(ships => {
            ctx.body = ships;
            logger.log(ships);
        }).catch(err => {
            logger.log(err);
            ctx.body = err;
        });

    }

    buyShipments = async (ctx: Context) => {
        const body = ctx.request.body.shipments;
        console.log(body);
        let shipments = [];
        for(let i = 0; i< body.length; i++) {
            shipments.push(this.api.Shipment.retrieve(body[i].id));
        }
        await Promise.all(shipments).then(async (ships) => {
            let buys = [];
            for(let i = 0; i < ships.length; i++) {
                buys.push(ships[i].buy(body[i].rateId));
            }
            await Promise.all(buys).then((shipment) => {
                ctx.body = ships.map(shipment => {return {
                    id: shipment.id,
                    label: shipment.postage_label,
                    rate: shipment.selected_rate,
                    tracking: shipment.tracker
                }});
            });

        })

    }

}
