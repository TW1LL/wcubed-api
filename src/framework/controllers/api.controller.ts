import Client from 'davenport';
import {Context} from 'koa';
import {logger} from '../../utils/logger';
import {ICustomRoute} from '../routes';
import {IApiController} from './api.controller.interface';

declare function emit(name: any, doc: any);
export const couchDbUrl = 'http://127.0.0.1:5984/';
export class ApiController<T> implements IApiController {
    public customRoutes: ICustomRoute[];
    protected dbName: string;
    protected db: Client<T>;
    constructor(dbName: string) {
        this.db = new Client<T>(couchDbUrl, dbName);
        this.dbName = dbName;
    }

    public getAll = async (ctx: Context) => {
       const body = await this.db.view(this.dbName, 'all');
       ctx.body = this.send(body.rows);
    }

    public get = async (ctx: Context) => {
        const body = await this.db.get(ctx.params.id);
        ctx.body = this.send(body);
    }

    public post = async (ctx: Context) => {
        logger.log(ctx.request.body);
        const res = await this.db.post(ctx.request.body);
        ctx.body = this.send(!!res);

    }

    public patch = (ctx: Context) => {
        // TODO: do couchDB stuff       
        ctx.body = this.send({});
    }

    public delete = (ctx: Context) => {
        // TODO: do couchDB stuff    
        ctx.body = this.send(true);
    }

    public send(obj: any): string {
        return JSON.stringify(obj);
    }
}
