import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from '../checkout/order.item';
@Entity()
export class Package {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column('varchar')
    public name: string;
    @Column('int')
    public length: number;
    @Column('int')
    public width: number;
    @Column('int')
    public height?: number;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.packaging)
    public orderItems: OrderItem[];

}
