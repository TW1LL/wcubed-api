import {CouchDoc} from 'davenport';
import {IProduct} from '../interfaces/product.interface';
import {Category} from './category';
import {Package} from './package';
import {Weight} from './weight';

export class Product implements CouchDoc, IProduct {
    /* tslint:disable */
    public _id: string;
    public _rev: string;
    /* tslint:enable */
    public name: string;
    public category: Category;
    public description: string;
    public price: number;
    public weight: Weight;
    public digital: boolean;

    public onHand: number;
    public hidden: boolean;
    public productionTime: number;
    public packaging: Package[];
    public thumbnail: string;
    public images: string[];
}
