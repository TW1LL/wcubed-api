import {Context} from 'koa';
import {ICustomRoute} from '../routes';
export interface IApiController {
    routes: ICustomRoute[];
    getAll(ctx: Context);
    get(ctx: Context);
    post(ctx: Context);
    patch(ctx: Context);
    delete(ctx: Context);
}
