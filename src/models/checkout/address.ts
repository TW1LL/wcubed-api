import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {User} from '../account/user';
import {Order} from './order';
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    public id?: number;

    @ManyToOne((type) => User, (user) => user.addresses)
    public user?: User;

    @OneToMany((type) => Order, (order) => order.address)
    public orders?: Order[];

    @Column('varchar')
    public companyName?: string;

    @Column('varchar')
    public street1: string;

    @Column('varchar')
    public street2?: string;

    @Column('varchar')
    public city: string;

    @Column('varchar')
    public state: string;

    @Column('varchar')
    public zip: string;

    @Column('varchar')
    public country: string;

    @Column('varchar')
    public email: string;

    public mode?: string;

    @Column('varchar')
    public residential: boolean;

    @Column('varchar')
    public name: string;

}
