import * as fs from 'fs';
import {Category} from '../app/models/cart/category';
import {Product} from '../app/models/cart/product';
import {Order} from '../app/models/checkout/order';
import {OrderItem} from '../app/models/checkout/order.item';
export function get() {
    const config = JSON.parse(fs.readFileSync('./config.json').toString());
    config.db.autoSchemaSync = true;
    config.db.database = 'wcubed';
    config.db.entities = [Product, Category, OrderItem, Order];

    return config;
}
