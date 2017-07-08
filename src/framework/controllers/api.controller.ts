import {Context} from 'koa';
import 'reflect-metadata';
import {Connection} from 'typeorm';

import {ICustomRoute} from '../routes';
import {IApiController} from './api.controller.interface';

export class ApiController<T> implements IApiController {
    public customRoutes: ICustomRoute[];
    protected type: any;
    protected name: string;
    protected db: any;
    constructor(db: Connection, name: string, type: any) {
        this.db = db.getRepository(type);
        this.type = type;
        this.name = name;
    }

    public getAll = async (ctx: Context) => {
        let query = this.db.createQueryBuilder(this.name);
        if (this.type.joins) {
            this.type.joins.forEach((join) => {
                query = query.innerJoinAndSelect(this.name + '.' + join, join);
            });
        }
        ctx.body = await query.getMany();
    }

    public get = async (ctx: Context) => {
        let query = this.db.createQueryBuilder(this.name);
        if (this.type.joins) {
            this.type.joins.forEach((join) => {
                query = query.innerJoinAndSelect(this.name + '.' + join, join);
            });
        }
        query.where(this.name + '.id = ' + ctx.params.id + '');
        ctx.body = await query.getOne();
    }

    public post = async (ctx: Context) => {
        const res = await this.db.persist(ctx.request.body);
        ctx.body = !!res;

    }

    public patch = async (ctx: Context) => {
        const res = await this.db.persist(ctx.request.body);
        ctx.body = !!res;
    }

    public delete = async (ctx: Context) => {
        const obj = await this.db.findOneById(ctx.params.id);
        const res = await this.db.remove(obj);
        ctx.body = !!res;
    }

}
