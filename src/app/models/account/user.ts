import {CouchDoc} from 'davenport';
import {Address} from '../checkout/address';
export class User implements CouchDoc {
    /* tslint:disable */
    public _id: string;
    public _rev: string;
    /* tslint:enable */
    public email: string;
    public addresses: Address[];
}
