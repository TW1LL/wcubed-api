import {Category} from '../cart/category';
import {Weight} from '../cart/weight';
export interface IProduct {
    name: string;
    category: Category;
    description: string;
    price: number;
    weight: Weight;
    digital: boolean;
}
