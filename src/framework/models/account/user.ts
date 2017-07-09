import {Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Address} from '../../../app/models/checkout/address';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public email: string;

    @ManyToOne((type) => Address, (address) => address.user)
    public addresses: Address[];

}
