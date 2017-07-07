import Client from 'davenport';
import { logger } from '../../utils/logger';
import { IApiController } from './api.controller.interface';
import { ICustomRoute } from '../routes';
import { Context } from 'koa';

declare function emit(name: any, doc: any);

export class ApiController<T> implements IApiController {
    protected dbName: string;
    protected db: Client<T>;
    customRoutes: ICustomRoute[];
    constructor(dbName: string) {
        let db = new Client<T>('http://127.0.0.1:5984/', dbName);
        this.db = db;
        this.dbName = dbName;
    }
    
    getAll = async (ctx: Context) => {
       let body = await this.db.view(this.dbName, 'all');
       ctx.body = this.send(body.rows);
    }
    
    get = async (ctx: Context) => {
        let body = await this.db.get(ctx.params.id);
        ctx.body = this.send(body);
    }
    
    post = async (ctx: Context) => {
        logger.log(ctx.request.body);
        let res = await this.db.post(ctx.request.body);
        ctx.body = this.send(res ? true : false);
       
    }
    
    patch = (ctx: Context) => {
        // TODO: do couchDB stuff       
        ctx.body = this.send({});
    }
    
    delete = (ctx: Context) => {
        // TODO: do couchDB stuff    
        ctx.body = this.send(true);
    }
    
    send(obj: any): string {
        return JSON.stringify(obj);
    }
}