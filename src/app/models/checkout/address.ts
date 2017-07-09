import {Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {User} from '../../../framework/models/account/user';
import {Order} from './order';
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToMany((type) => User, (user) => user.addresses)
    public user: User;
    @Column('varchar')
    public firstName: string;
    @Column('varchar')
    public lastName: string;
    @Column('varchar')
    public companyName?: string;
    @Column('varchar')
    public streetAddress: string;
    @Column('varchar')
    public streetAddress2?: string;
    @Column('varchar')
    public city: string;
    @Column('varchar')
    public state: string;
    @Column('varchar')
    public zipCode: string;
    @Column('varchar')
    public country: string;
    @Column('varchar')
    public phone: string;
    @Column('varchar')
    public email: string;

    @OneToMany((type) => Order, (order) => order.address)
    public orders: Order[];
}
