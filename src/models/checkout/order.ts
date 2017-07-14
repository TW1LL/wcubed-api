import {Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Address} from './address';
import {OrderItem} from './order.item';
import {Payment} from './order.payment';
import {User} from '../account/user';
@Entity()
export class Order {
    public static joins: string[] = ['products'];

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => User)
    public user: User;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
    public items: OrderItem[];

    @ManyToOne((type) => Address, (address) => address.orders)
    public address: Address;

    @OneToOne((type) => Payment)
    public payment: Payment;

    @CreateDateColumn()
    public dateCreated: Date;

    @UpdateDateColumn()
    public dateModified: Date;

    @Column('text')
    public description: string;

    @Column('decimal')
    public total: number;

}
