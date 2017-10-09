import * as bcrypt from 'bcrypt-nodejs';
import {Context} from 'koa';
import {Connection} from 'typeorm';
import {Auth} from '../auth';
import {User} from '../../models/account/user';
import {UserAuth, rankTitle} from '../../models/account/user.auth';
import {ApiController} from './api.controller';

export class UserController extends ApiController<User> {
    constructor(db: Connection) {
        super(db, 'user', User);
        this.routes = [
            {
                method: 'post',
                path: '/user/login',
                fn: this.login
            },
            {
                method: 'post',
                path: '/user/register',
                fn: this.register
            },
            {
                method: 'patch',
                path: '/user/password',
                fn: this.changePassword
            },
            {
                method: 'post',
                path: '/user/check-rank',
                fn: this.checkRank
            },
            {
                method: 'patch',
                path: '/user/rank',
                fn: this.changeRank
            },
            {
                method: 'post',
                path: '/user/address',
                fn: this.addAddress
            }
        ];
    }

    public login = async (ctx: Context) => {
        const usr = await this.query().where(this.whereEqual('email', ctx.request.body.email)).getOne();
        if (usr) {
            const userAuth = await this.userAuth.findOne({userId: usr.id});
            if (userAuth && bcrypt.compareSync(ctx.request.body.password, userAuth.password)) {
                const token = new Auth(ctx, this.userAuth).authorize(usr);
                ctx.body = {
                    result: true,
                    token: token,
                    user: usr
                };
            } else {
                ctx.body = {
                    result: false,
                    message: 'Passwords do not match.'
                };
            }
        } else {
            ctx.body = {
                result: false,
                message: 'Could not find a user with that email address.'
            };
        }
    }

    public register = async (ctx: Context) => {
        const usr = await this.query().where(this.whereEqual('email', ctx.request.body.email)).getOne();
        if (usr) {
            const userAuth: UserAuth = await this.userAuth.findOne({userId: usr.id});
            if (userAuth && !userAuth.password) {
                if(ctx.request.body.password === ctx.request.body.repeatPassword) {
                    userAuth.password = bcrypt.hashSync(ctx.request.body.password);
                    const result = await this.userAuth.persist(userAuth);
                    if (!!result) {
                        const token = new Auth(ctx, this.userAuth).authorize(usr);
                        ctx.body = {
                          result: result,
                            user: usr,
                            token: token
                        }
                    } else {
                        ctx.body = {
                            result: result,
                            message: 'Something went wrong creating a user. Please try again.'
                        };
                    }
                } else {
                    ctx.body = {
                        result: false,
                        message: 'The passwords you have submitted do not match.'
                    };
                }
            } else {
                ctx.body = {
                    result: false,
                    message: 'You are already registered.'
                }
            }
        } else {
            if(ctx.request.body.password === ctx.request.body.repeatPassword) {
                const user = new User();
                user.email = ctx.request.body.email;
                const userAuth = new UserAuth();
                userAuth.user = user;
                userAuth.rank = rankTitle.User;
                userAuth.password = bcrypt.hashSync(ctx.request.body.password);
                const res = await this.db.persist(user);
                const res2 = await this.userAuth.persist(userAuth);
                const result = (!!res && !!res2);
                if (result) {
                    const token = new Auth(ctx, this.userAuth).authorize(user);
                    ctx.body = {
                        result: result,
                        user: user,
                        token: token
                    };
                } else {
                    ctx.body = {
                        result: result,
                        message: 'Something went wrong creating a user. Please try again.'
                    };
                }
            } else {
                ctx.body = {
                    result: false,
                    message: 'The passwords you have submitted do not match.'
                };
            }
        }
    }

    public changePassword = async (ctx: Context) => {
        const [valid, userToken] = await new Auth(ctx, this.userAuth).authorized(rankTitle.User);
        if (valid) {
            let user;
            if (!ctx.request.body.id || userToken.id === ctx.request.body.id) {
                user = userToken;
            } else if (userToken.rank >= rankTitle.Admin) {
                user = this.userAuth.findOneById(ctx.request.body.id);
            } else {
                user = false;
            }
            if (user && bcrypt.compareSync(ctx.request.body.oldPassword, user.password)) {
                user.password = bcrypt.hashSync(ctx.request.body.newPassword);
                const res = await this.userAuth.persist(user);
                ctx.body = !!res;
            } else {
                ctx.body = false;
            }
        } else {
            ctx.body = false;
        }
    }

    public checkRank = async (ctx: Context) => {

        const [valid, userToken] = await new Auth(ctx, this.userAuth).authorized(ctx.request.body.rank);
        ctx.body = {
            result: valid
        }
    }

    public changeRank = async (ctx: Context) => {
        const [valid, userToken] = await new Auth(ctx, this.userAuth).authorized(rankTitle.Admin);
        if (valid) {
            const user = (userToken.id === ctx.request.body.id) ?
                userToken :
                await this.userAuth.findOneById(ctx.request.body.id);
            user.rank = ctx.request.body.rank;
            const res = await this.userAuth.persist(user);
            ctx.body = !!res;
        } else {
            ctx.body = false;
        }

    }

    public addAddress = async (ctx: Context) => {
        const [valid, userToken] = await new Auth(ctx, this.userAuth).authorized(rankTitle.User);
        if (valid) {
            let userId ;
            if (!ctx.request.body.id || userToken.id === ctx.request.body.id) {
                userId = userToken.id;
            } else if (userToken.rank >= rankTitle.Admin) {
                userId = ctx.request.body.id;
            } else {
                userId = false;
            }
            const user = await this.db.findOneById(userId);
            user.addresses.push(ctx.request.body.address);
            const res = await this.db.persist(user);
            ctx.body = !!res;
        } else {
            ctx.body = false;
        }
    }
}
