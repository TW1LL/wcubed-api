import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Order} from '../../models/checkout/order';
import {rankTitle} from '../../models/account/user.auth';
import {Auth} from '../../framework/auth';
import {Context} from 'koa';
import {logger} from '../../utils/logger';
import {User} from '../../models/account/user';
export default class OrderController extends ApiController<Order> {
    userRepo: any;

    constructor(db: Connection) {
        super(db, 'orders', Order);
        this.userRepo = db.getRepository(User);
        this.routes = [
            {
                path: '/order/create',
                method: 'post',
                fn: this.createOrder
            }
        ]
    }

    createOrder = async (ctx: Context) => {
        logger.log('ORDER >> CREATE');
        const order: Order = ctx.request.body;
        const [valid, usr] = await new Auth(ctx, this.userAuth).authorized(rankTitle.User);
        let user;
        if (!valid) {
            user = new User();
            user.email = order.address.email;
            user = await this.userRepo.persist(user);
            order.user = user;
        } else {
            user = this.userRepo.findOneById(usr.id);
        }
        order.description = this.createDescription(order);
        const res = await this.db.persist(order);
        ctx.body = res;
        if (!!res) {
            logger.info('API >> CREATE ORDER SUCCESS ' + valid ? 'NEW USER' : 'AUTH');
        } else {
            logger.info('API >> CREATE ORDER FAILED ' + valid ? 'NEW USER' : 'AUTH');
        }
    }

    createDescription(order: Order) {
        let description = order.items[0].product.name;
        if (order.items.length > 1) {
            description += ' and ' + (order.items.length - 1) + ' other items';
        }
        return description;
    }
}
