import {CouchDoc} from 'davenport';
import {Weight} from "./weight";
import {Package} from "./package";
import {Category} from "./category";
import {IProduct} from "../interfaces/product.interface";

export class Product implements CouchDoc, IProduct {
    _id: string;
    _rev: string;

    name: string;
    category: Category;
    description: string;
    price: number;
    weight: Weight;
    digital: boolean;

    onHand: number;
    hidden: boolean;
    productionTime: number;
    packaging: Package[];
    thumbnail: string;
    images: string[];


}
