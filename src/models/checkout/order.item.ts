import {Column, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Product} from '../cart/product';
import {Package} from '../cart/package';
import {OrderShipment} from './order.shipment';
import {Order} from './order';
@Entity()
export class OrderItem {
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

    @ManyToOne((type) => Package, (pack) => pack.orderItems)
    @JoinColumn()
    public packaging: Package;

    @OneToOne((type) => OrderShipment)
    @JoinColumn()
    public shipment: OrderShipment;

    @ManyToOne((type) => Order, (order) => order.items)
    @JoinColumn()
    public order: Order;


}
