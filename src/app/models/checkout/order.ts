import {Address} from 'cluster';
import {Payment} from './order.payment';
import {OrderProduct} from './order.product';
export class Order {
    public userId: string;
    public products: OrderProduct[];
    public address: Address;
    public dateCreated: Date;
    public dateModified: Date;
    public description: string;
    public total: number;
    public payment: Payment;
}
