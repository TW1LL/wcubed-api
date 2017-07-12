import {Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Embedded} from 'typeorm/decorator/Embedded';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Address} from './address';
import {OrderItem} from './order.item';
import {Payment} from './order.payment';
@Entity()
export class Order {
    public static joins: string[] = ['products'];

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public userId: string;

    @ManyToOne((type) => OrderItem, (orderItem) => orderItem.order)
    public items: OrderItem[];

    @OneToMany((type) => Address, (address) => address.orders)
    public address: Address;

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
