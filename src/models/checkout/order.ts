import {Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany} from 'typeorm';
import {Embedded} from 'typeorm/decorator/Embedded';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Address} from './address';
import {OrderItem} from './order.item';
import {Payment} from './order.payment';
import {User} from '../account/user';
import {OrderShipment} from './order.shipment';
@Entity()
export class Order {
    public static joins: string[] = ['products'];

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => User, (user) => user.orders )
    public user: User;

    @ManyToOne((type) => OrderItem, (orderItem) => orderItem.order)
    public items: OrderItem[];

    @OneToMany((type) => Address, (address) => address.orders)
    public address: Address;

    @ManyToOne((type) => OrderShipment, (shipment) => shipment.order)
    public shipments: OrderShipment[];

    @CreateDateColumn()
    public dateCreated: Date;

    @UpdateDateColumn()
    public dateModified: Date;

    @Column('text')
    public description: string;

    @Column('decimal')
    public total: number;

    @Embedded((type) => Payment)
    public payment: Payment;

}
