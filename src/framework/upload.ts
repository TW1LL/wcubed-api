import {Context} from 'koa';
import {logger} from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';
import {rankTitle, UserAuth} from '../models/account/user.auth';
import {Auth} from './auth';
import {Connection} from 'typeorm';

export async function upload(ctx: Context, db: Connection) {
    const userAuth = db.getRepository(UserAuth);
    const [valid, user] = await new Auth(ctx, userAuth).authorized(rankTitle.Mod);
    if (valid) {
        ctx.body = {
            result: 'uploading'
        }
        const file = ctx.request.body.files.image;
        const type = ctx.params.type;
        logger.log('UPLOAD >> ' + type);
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(path.join('/var/www/wcubed-spa/assets/images', type, file.name));
        reader.pipe(stream);
    } else {
        ctx.body = false;
    }

}