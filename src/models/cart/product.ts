import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from '../checkout/order.item';
import {Category} from './category';
import {Package} from './package';

@Entity()
export class Product {
    public static joins: string[] = ['category'];

    @PrimaryGeneratedColumn()
    public id: number;

    @ManyToOne((type) => Category, (category) => category.products)
    public category: Category;

    @ManyToMany((type) => Package)
    @JoinTable()
    public packaging: Package[];

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
