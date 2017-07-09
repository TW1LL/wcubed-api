import {Connection, ConnectionOptions, createConnection} from 'typeorm';
export class Db {
    public connection: Connection;

    public async connect(dbConfig: ConnectionOptions): Promise <Connection> {
        this.connection = await createConnection(dbConfig);
        return this.connection;
    }
}

export const db = new Db();
