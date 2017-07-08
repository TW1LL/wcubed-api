import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Product} from '../cart/product';
import {Order} from './order';
@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany((type) => Product, (product) => product.orderProducts)
    public product: Product;

    @Column('int')
    public quantity: number;

    // public packaging: Package;

    // public shipment: OrderShipment;

    @ManyToOne((type) => Order, (order) => order.items)
    public order: Order;
}
