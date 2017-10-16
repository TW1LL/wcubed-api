import {Column, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Product} from '../cart/product';
import {Package} from '../cart/package';
import {OrderShipment} from './order.a.shipment';
import {Order} from './order';
@Entity()
export class OrderItem {
    public static joins: any = [['product', Product], ['packaging', Package], ['shipment', OrderShipment]];

    constructor(id: number = 0, product: Product = null, quantity: number = null) {
        this.product = product;
        this.quantity = quantity;
        this.id = id;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('int')
    public quantity: number;

    @ManyToOne((type) => Product, (product) => product.orderItems)
    @JoinColumn()
    public product: Product;

    @ManyToOne((type) => Package, (pack) => pack.orderItems, { cascadeUpdate: true, cascadeInsert: true})
    @JoinColumn()
    public packaging: Package;

    @OneToOne((type) => OrderShipment, { cascadeUpdate: true, cascadeInsert: true})
    @JoinColumn()
    public shipment: OrderShipment;

    @ManyToOne((type) => Order, (order) => order.items)
    @JoinColumn()
    public order: Order;

    @Column({type:'tinyint', default: 0})
    public deleted?: number;

}
