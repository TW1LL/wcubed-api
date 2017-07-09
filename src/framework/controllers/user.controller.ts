import * as bcrypt from 'bcrypt-nodejs';
import {Context} from 'koa';
import {Connection} from 'typeorm';
import {Auth} from '../auth';
import {User} from '../models/account/user';
import {UserAuth} from '../models/account/user.auth';
import {ApiController} from './api.controller';
export class UserController extends ApiController<User> {
    private userAuth: any;
    constructor(db: Connection) {
        super(db, 'user', User);
        this.userAuth = db.getRepository(UserAuth);
        this.customRoutes = [
            {
                method: 'post',
                path: '/user/login',
                fn: this.login
            },
            {
                method: 'post',
                path: '/user/register',
                fn: this.register
            }
        ];
    }

    public login = async (ctx: Context) => {
        const auth = new Auth(ctx);
        const usr = await this.query().where(this.where('email', ctx.request.body.email)).getOne();
        if (usr) {
            const userAuth = await this.userAuth.findOneById(usr.id);
            if (bcrypt.compareSync(ctx.request.body.password, userAuth.password)) {
                ctx.body = auth.authorize(usr);
            } else {
                ctx.body = false;
            }
        } else {
            ctx.body = false;
        }
    }

    public register = async (ctx: Context) => {
        const auth = new Auth(ctx);
        const usr = await this.query().where(this.where('email', ctx.request.body.email)).getOne();
        if (usr) {
            ctx.body = false;
        } else {
            const user = new User();
            user.email = ctx.request.body.email;
            const userAuth = new UserAuth();
            userAuth.user = user;
            userAuth.password = bcrypt.hashSync(ctx.request.body.password);
            const res = await this.db.persist(user);
            const res2 = await this.userAuth.persist(userAuth);
            ctx.body = (!!res && !!res2);
        }
    }
}
