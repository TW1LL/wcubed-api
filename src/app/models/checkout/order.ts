import {OrderProduct} from "./order.product";
import {Address} from "cluster";
import {Payment} from "./order.payment";
export class Order {
    userId: string;
    products: OrderProduct[];
    address: Address;
    dateCreated: Date;
    dateModified: Date;
    description: string;
    total: number;
    payment: Payment;

}

