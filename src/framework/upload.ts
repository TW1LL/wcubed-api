import {Context} from 'koa';
import {logger} from '../utils/logger';
import * as fs from 'fs';
import * as path from 'path';
import {rankTitle, UserAuth} from '../models/account/user.auth';
import {Auth} from './auth';
import {Connection} from 'typeorm';

export async function upload(ctx: Context, db: Connection) {
    const userAuth = db.getRepository(UserAuth);
    ctx.body = {
        result: 'uploading'
    };
    const [valid, user] = await new Auth(ctx, userAuth).authorized(rankTitle.Mod);
    if (valid) {
        const file = ctx.request.body.files.image;
        const type = ctx.params.type;
        await uploadImage(file, type);



    } else {
        ctx.body = false;
    }

}

async function uploadImage(file, type) {
    return new Promise((resolve) => {
        const reader = fs.createReadStream(file.path);
        const stream = fs.createWriteStream(path.join('/var/www/wcubed-spa/assets/images', type, file.name));
        reader.pipe(stream);
        const stream2 = fs.createWriteStream(path.join('/var/node/wcubed-spa/src/assets/images', type, file.name));
        reader.pipe(stream2);
        logger.log('UPLOAD >> ' + type);
        reader.on('finish', () => {

            resolve(true);
        })

    })
}