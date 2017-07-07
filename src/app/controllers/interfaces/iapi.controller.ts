import { Context } from 'koa';

export interface IApiController {
    getAll(ctx: Context);
    get(ctx: Context);
    post(ctx: Context);
    patch(ctx: Context);
    delete(ctx: Context);
}