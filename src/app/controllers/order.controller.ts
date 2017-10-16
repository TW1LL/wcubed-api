import {Connection} from 'typeorm';
import {ApiController} from '../../framework/controllers/api.controller';
import {Order} from '../../models/checkout/order';
import {rankTitle, UserAuth} from '../../models/account/user.auth';
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
            },
            {
                path: '/order/user',
                method: 'get',
                fn: this.getOrdersForUser
            }
        ]
    }

    getOrdersForUser = async (ctx: Context) => {
        const [valid, usr] = await new Auth(ctx, this.userAuth).authorized(rankTitle.User);
        if (valid) {
            ctx.body = await this.query(false).where(this.whereEqual('userId', usr.id.toString()));
        }
        else {
            ctx.body = false;
        }
    }

    createOrder = async (ctx: Context) => {
        logger.log('ORDER >> CREATE');
        const order: Order = ctx.request.body;
        const [valid, usr] = await new Auth(ctx, this.userAuth).authorized(rankTitle.User);
        let user;
        if (!valid) {
            user = await this.userRepo.find({email: order.address.email})[0];
            if (!user) {
                user = new User();
                user.email = order.address.email;
                user = await this.userRepo.persist(user);
                let userAuth = new UserAuth();
                userAuth.user = user;
                userAuth = await this.userAuth.persist(userAuth);
            }
        } else {
            user = usr;
        }

        order.user = user;
        order.description = this.createDescription(order);
        console.log(order);
        const res = await this.db.persist(order);
        ctx.body = res;
        if (!!res) {
            logger.info('API >> CREATE ORDER SUCCESS ' + (valid ? 'AUTH' : 'NEW USER'));
        } else {
            logger.info('API >> CREATE ORDER FAILED ' + (valid ? 'AUTH' : 'NEW USER'));
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
