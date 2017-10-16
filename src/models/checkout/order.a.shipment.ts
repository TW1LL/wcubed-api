import {Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {Order} from './order';
@Entity()
export class OrderShipment {
    constructor(shipmentId: string, rateId?: string, price?: number) {
        this.shipmentId = shipmentId;
        this.rateId = rateId;
        this.price = price;
    }

    @PrimaryGeneratedColumn()
    public id: string;

    @Column('varchar')
    public shipmentId: string;

    @Column('varchar')
    public rateId: string;

    @Column('text', { nullable: true})
    public label?: string;

    @Column('varchar')
    public carrier?: string;

    @Column('varchar')
    public service?: string;

    @Column('varchar', { nullable: true})
    public tracking?: string;

    @Column('varchar', { nullable: true})
    public shipped?: boolean;

    @Column('float')
    public price: number;

    @Column({type:'tinyint', default: 0})
    public deleted?: number;
}
