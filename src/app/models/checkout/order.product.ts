import {Category} from '../cart/category';
import {Package} from '../cart/package';
import {Weight} from '../cart/weight';
import {IProduct} from '../interfaces/product.interface';
import {OrderShipment} from './order.shipment';
export class OrderProduct implements IProduct {
    public name: string;
    public category: Category;
    public description: string;
    public price: number;
    public weight: Weight;
    public digital: boolean;

    public quantity: number;
    public packaging: Package;

    public shipment: OrderShipment;
}
