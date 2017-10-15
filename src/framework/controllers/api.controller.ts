import {Context} from 'koa';
import 'reflect-metadata';
import {Connection} from 'typeorm';
import {SelectQueryBuilder} from 'typeorm/query-builder/SelectQueryBuilder';
import {logger} from '../../utils/logger';
import {Auth} from '../auth';
import {rankTitle, UserAuth} from '../../models/account/user.auth';
import {ICustomRoute} from '../routes';
import {IApiController} from './api.controller.interface';

export class ApiController<T> implements IApiController {
    public routes: ICustomRoute[];
    protected type: any;
    protected name: string;
    protected db: any;
    protected userAuth: any;
    constructor(db: Connection, name: string, type: any) {
        this.db = db.getRepository(type);
        this.userAuth = db.getRepository(UserAuth);
        this.type = type;
        this.name = name;
    }

    public getAll = async (ctx: Context) => {
        if (this.type.permissions) {
            const [valid, user] = await new Auth(ctx, this.userAuth).authorized(this.type.permissions);
            if (valid) {
                logger.info('API >> GET ALL ' + this.name);
                ctx.body = await this.query(true).getMany();
            } else {
                logger.info('API >> GET ALL FAILED ' + this.name + ' UNAUTH');
                ctx.body = false;
            }
        } else {
            logger.info('API >> GET ALL ' + this.name);
            ctx.body = await this.query(true).getMany();
        }

    }

    public get = async (ctx: Context) => {
        if (this.type.permissions) {
            const [valid, user] = await new Auth(ctx, this.userAuth).authorized(this.type.permssions);
            if (valid) {
                logger.info('API >> GET ' + this.name + ' id:' + ctx.params[0]);
                const id = ctx.params[0];
                ctx.body = await this.query(true).where(this.whereEqual('id', id)).getOne();
            } else {
                logger.info('API >> GET FAILED ' + this.name + ' UNAUTH');
                ctx.body = false;
            }
        } else {
            logger.info('API >> GET ' + this.name + ' id:' + ctx.params[0]);
            const id = ctx.params[0];
            ctx.body = await this.query(true).where(this.whereEqual('id', id)).getOne();
        }
    }

    public post = async (ctx: Context) => {
        const [valid, user] = await new Auth(ctx, this.userAuth).authorized(rankTitle.Mod);
        if (valid) {
            const res = await this.db.persist(ctx.request.body);
            ctx.body = res;
            if (!!res) {
                logger.info('API >> POST SUCCESS ' + this.name + ' AUTH');
            } else {
                logger.info('API >> POST FAILED ' + this.name + ' AUTH');
            }
        } else {
            logger.info('API >> POST FAILED ' + this.name + ' UNAUTH');
            ctx.body = false;
        }
    }

    public patch = async (ctx: Context) => {
        const [valid, user] = await new Auth(ctx, this.userAuth).authorized(rankTitle.Mod);
        if (valid) {
            const obj = await this.update(ctx.request.body);
            const res = await this.db.persist(obj);
            ctx.body = !!res;
            if (ctx.body === true) {
                logger.info('API >> PATCH SUCCESS ' + this.name + ' AUTH');
            } else {
                logger.info('API >> PATCH FAILED ' + this.name + ' AUTH');
            }
        } else {
            logger.info('API >> PATCH FAILED ' + this.name + ' UNAUTH');
            ctx.body = false;
        }
    }

    public delete = async (ctx: Context) => {
        const [valid, user] = await new Auth(ctx, this.userAuth).authorized(rankTitle.Admin);
        if (valid) {
            const obj = await this.db.findOneById(ctx.params[0]);
            const res = await this.db.remove(obj);
            ctx.body = !!res;
            if (ctx.body === true) {
                logger.info('API >> DELETE SUCCESS ' + this.name + ' AUTH');
            } else {
                logger.info('API >> DELETE FAILED ' + this.name + ' AUTH');
            }
        } else {
            logger.info('API >> DELETE FAILED ' + this.name + ' UNAUTH');
            ctx.body = false;
        }
    }

    protected query(join: boolean = false): SelectQueryBuilder<T> {
        let query = this.db.createQueryBuilder(this.name);
        query = join ? this.join(query) : query;
        return query;
    }
    protected update = async (body) => {
        const obj = await this.db.findOneById(body.id);
        for (const i in body) {
            if (obj && obj.hasOwnProperty(i)) {
                obj[i] = body[i];
            }
        }
        return obj;
    }

    protected column(name: string) {
        return this.name + '.' + name;
    }
    protected whereEqual(column: string, value: string) {
        return this.column(column) + ' = "' + value + '"';
    }
    protected join = (query, join?, type?) => {
        let joinType = this.type;
        if (type) {
            joinType = type;
        }
        if (joinType && joinType.joins) {
            joinType.joins.forEach(([join1, type1]) => {
                const name = type ? join : this.name;
                query = query.innerJoinAndSelect(name + '.' + join1, join1);
                if (type1 && type1.joins) query = this.join(query, join1, type1);
            });
        }
        return query;
    }
}
