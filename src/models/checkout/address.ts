import {Column, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {User} from '../account/user';
import {Order} from './order';
@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column('varchar')
    public name: string;

    @ManyToOne((type) => User, (user) => user.addresses)
    public user?: User;

    @OneToMany((type) => Order, (order) => order.address)
    public orders?: Order[];

    @Column('varchar', { nullable: true})
    public companyName?: string;

    @Column('varchar')
    public street1: string;

    @Column('varchar', { nullable: true})
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

    @Column('varchar', { default: true})
    public residential: boolean;


}
