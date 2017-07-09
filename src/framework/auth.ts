import * as jwt from 'jsonwebtoken';
import {Context} from 'koa';
import config from '../app/config';
import {logger} from '../utils/logger';
import {User} from './models/account/user';
import {UserAuth} from './models/account/user.auth';

export class Auth {
    private ctx: Context;
    private headers: any;
    private config: any;
    private userAuth: any;
    constructor(ctx: Context, db: any) {
        this.ctx = ctx;
        this.headers = ctx.headers;
        this.config = config.get();
        this.userAuth = db;
    }
    public async authorized(requiredRank: number = 0): Promise<[boolean, UserAuth]> {
        if (!this.headers.token) {
            return [requiredRank === 0, null];
        }
        try {
            const userToken: User = jwt.verify(this.headers.token, this.config.secret);
            const user = await this.userAuth.findOneById(userToken.id);
            if (user && user.rank >= requiredRank) {
                return [true, user];
            } else {
                return [false, null];
            }
        } catch (err) {
            logger.error(err);
            return [false, null];
        }
    }

    public authorize(data): string {
        try {
            return jwt.sign(data, this.config.secret, { expiresIn: '8h' });
        } catch (err) {
            logger.error(err);
            return 'error';
        }
    }

}
