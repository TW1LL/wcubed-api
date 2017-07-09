import * as jwt from 'jsonwebtoken';
import {Context} from 'koa';
import config from '../app/config';
import {logger} from '../utils/logger';
import {User} from './models/account/user';

export class Auth {
    private ctx: Context;
    private headers: any;
    private config: any;
    constructor(ctx: Context) {
        this.ctx = ctx;
        this.headers = ctx.headers;
        this.config = config.get();
    }
    public authorized(): [boolean, User] {
        if (!this.headers.token) {
            return [false, null];
        }
        try {
            const decoded = jwt.verify(this.headers.token, this.config.secret);
            return [true, decoded];
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
