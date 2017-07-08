import {Context} from 'koa';
import 'reflect-metadata';
import {Connection} from 'typeorm';
import {SelectQueryBuilder} from 'typeorm/query-builder/SelectQueryBuilder';
import {logger} from '../../utils/logger';

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
        ctx.body = await this.query().getMany();
    }

    public get = async (ctx: Context) => {
        ctx.body = await this.query().where(this.name + '.id = ' + ctx.params.id + '').getOne();
    }

    public post = async (ctx: Context) => {
        const res = await this.db.persist(ctx.request.body);
        ctx.body = !!res;
    }

    public patch = async (ctx: Context) => {
        const obj = await this.update(ctx.request.body);
        const res = await this.db.persist(obj);
        ctx.body = !!res;
    }

    public delete = async (ctx: Context) => {
        const obj = await this.db.findOneById(ctx.params.id);
        const res = await this.db.remove(obj);
        ctx.body = !!res;
    }

    protected query(join: boolean = false): SelectQueryBuilder<T> {
        let query = this.db.createQueryBuilder(this.name);
        logger.log('logging query');
        query = join ? this.join(query) : query;
        return query;
    }
    private join = (query) => {
        logger.log('logging join');
        if (this.type.joins) {
            this.type.joins.forEach((join) => {
                query = query.innerJoinAndSelect(this.name + '.' + join, join);
            });
        }
        return query;
    }
    private update = async (body) => {
        const obj = await this.db.findOneById(body.id);
        for (const i in body) {
            obj[i] = body[i];
        }
        return obj;
    }

}
