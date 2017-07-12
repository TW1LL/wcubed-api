import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {OrderItem} from '../checkout/order.item';
import {Category} from './category';

@Entity()
export class Product {
    public static joins: string[] = ['category'];

    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public name: string;

    @ManyToOne((type) => Category, (cat) => cat.products)
    public category: Category;

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

    @ManyToOne((type) => OrderItem, (orderProduct) => orderProduct.product)
    public orderProducts: OrderItem[];

}
