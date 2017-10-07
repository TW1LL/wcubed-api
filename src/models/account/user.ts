import {Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Address} from '../checkout/address';
import {Order} from '../checkout/order';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public email: string;

    @OneToMany((type) => Address, (address) => address.user)
    public addresses: Address[];

    @OneToMany((type) => Order, (order) => order.user)
    public orders: Order[];
}
