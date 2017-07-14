import {Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Order} from './order';
@Entity()
export class OrderShipment {
    @PrimaryGeneratedColumn()
    public id: string;
    @Column('text')
    public label: string;
    @Column('varchar')
    public tracking: string;
    @Column('varchar')
    public shipped: boolean;

    @OneToMany((type) => Order, (order) => order.shipments)
    public order: Order;
}
