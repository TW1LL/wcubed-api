import {IProduct} from "../interfaces/product.interface";
import {Category} from "../cart/category";
import {Weight} from "../cart/weight";
import {Package} from "../cart/package";
import {OrderShipment} from "./order.shipment";
export class OrderProduct implements IProduct {
    name: string;
    category: Category;
    description: string;
    price: number;
    weight: Weight;
    digital: boolean;

    quantity: number;
    packaging: Package;

    shipment: OrderShipment;

}