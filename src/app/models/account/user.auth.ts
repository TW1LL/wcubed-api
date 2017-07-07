import {CouchDoc} from 'davenport';
export class UserAuth implements CouchDoc {
    /* tslint:disable */
    public _id: string;
    public _rev: string;
    /* tslint:enable */
    public userId: string;
    public password: string;
}
