import {
    Column, CreateDateColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne,
    JoinColumn
} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Address} from './address';
import {OrderItem} from './order.item';
import {Payment} from './order.payment';
import {User} from '../account/user';
@Entity()
export class Order {
    public static joins: any = [['user', User], ['items', OrderItem], ['address', Address], ['payment', Payment]];

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => User)
    @JoinColumn()
    public user: User;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.order, { cascadeUpdate: true, cascadeInsert: true})
    public items: OrderItem[];

    @ManyToOne((type) => Address, (address) => address.orders, { cascadeAll: true})
    @JoinColumn()
    public address: Address;

    @OneToOne((type) => Payment, { cascadeAll: true})
    @JoinColumn()
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
