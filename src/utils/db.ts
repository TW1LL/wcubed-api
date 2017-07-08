import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import * as config from '../framework/config';
import {logger} from './logger';
export class Db {
    public connection: Connection;
    private dbConfig: ConnectionOptions;

    constructor() {
        this.dbConfig = config.get().db;
    }
    public async connect(): Promise <Connection> {
        this.connection = await createConnection(this.dbConfig);
        logger.log(this.connection);
        return this.connection;
    }
}

export const db = new Db();
