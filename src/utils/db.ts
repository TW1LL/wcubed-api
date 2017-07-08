import {Connection, ConnectionOptions, createConnection} from 'typeorm';
import {logger} from './logger';
export class Db {
    public connection: Connection;

    public async connect(dbConfig: ConnectionOptions): Promise <Connection> {
        this.connection = await createConnection(dbConfig);
        logger.log(this.connection);
        return this.connection;
    }
}

export const db = new Db();
