import Client from 'davenport';
import { logger } from '../../utils/logger';
declare function emit(name: any, doc: any);
export class ApiController<T> {
    protected dbName: string;
    protected db: Client<T>;
    constructor(dbName: string) {
        let db = new Client<T>('http://127.0.0.1:5984/', dbName);
        this.db = db;
        this.dbName = dbName;
    }
    
    getAll = async (ctx: Context) => {
       let body = await this.db.view(dbName, 'all');
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
        ctx.body = this.send(new Product());
    }
    
    delete = (ctx: Context) => {
        // TODO: do couchDB stuff    
        ctx.body = this.send(true);
    }
    
    send(obj: any): string {
        return JSON.stringify(obj);
    }
    
}