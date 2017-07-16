import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from '../checkout/order.item';
import {Product} from './product';
@Entity()
export class Package {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar', {nullable: true})
    public name?: string;

    @Column('int', {nullable: true})
    public length?: number;

    @Column('int', {nullable: true})
    public width?: number;

    @Column('int', {nullable: true})
    public height?: number;

    @Column('varchar', {nullable: true})
    public predefined_package?: string;

    public weight?: number;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.packaging)
    public orderItems: OrderItem[];

    @OneToMany((type) => Product, (product) => product.packaging)
    public products: Product[];

}

export class Parcel {
    constructor(packaging: Package, weight: number) {
        this.length = packaging.length;
        this.width = packaging.width;
        this.height = packaging.height;
        this.predefined_package = packaging.predefined_package;
        this.weight = weight;
    }

    public length?: number;

    public width?: number;

    public height?: number;

    public predefined_package?: string;

    public weight?: number;

}

