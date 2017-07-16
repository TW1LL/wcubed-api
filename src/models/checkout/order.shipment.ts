import {Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Order} from './order';
@Entity()
export class OrderShipment {
    constructor(shipmentId: string) {
        this.shipmentId = shipmentId;
    }

    @PrimaryGeneratedColumn()
    public id: string;

    @Column('varchar')
    public shipmentId: string;

    @Column('text')
    public label?: string;

    @Column('varchar')
    public rateId: string;

    @Column('varchar')
    public tracking?: string;

    @Column('varchar')
    public shipped?: boolean;

}
