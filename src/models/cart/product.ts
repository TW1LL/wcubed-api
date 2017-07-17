import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from '../checkout/order.item';
import {Category} from './category';
import {Package} from './package';

@Entity()
export class Product {
    public static joins: any = [['category', Category], ['prodPackaging', Package]];

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => Category, (category) => category.products)
    public category: Category;

    @ManyToOne((type) => Package, (pack) => pack.products)
    public prodPackaging: Package;

    @OneToMany((type) => OrderItem, (orderItem) => orderItem.product)
    public orderItems: OrderItem[];

    @Column('varchar')
    public name: string;

    @Column('text')
    public description: string;

    @Column('decimal')
    public price: number;

    @Column('decimal')
    public weight: number;

    @Column('varchar')
    public digital: boolean;

    @Column('int')
    public onHand: number;

    @Column('varchar')
    public hidden: boolean;

    @Column('float')
    public productionTime: number;

    @Column('varchar')
    public thumbnail: string;

    @Column('text')
    public images: string;



}
