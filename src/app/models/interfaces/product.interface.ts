import {Weight} from "../cart/weight";
import {Category} from "../cart/category";
export interface IProduct {
    name: string;
    category: Category;
    description: string;
    price: number;
    weight: Weight;
    digital: boolean;
}

