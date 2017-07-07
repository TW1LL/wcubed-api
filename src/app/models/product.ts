import { IProduct } from './interfaces/iproduct';
import {CouchDoc} from 'davenport';
export class Product implements CouchDoc, IProduct {
    _id: string;
    _rev: string;
    name: string;
    constructor() {
        
    }
}
