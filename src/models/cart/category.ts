import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Product} from './product';
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('varchar')
    public name: string;

    @Column('varchar')
    public description: string;

    @Column('varchar')
    public thumbnail: string;

    @OneToMany((type) => Product, (product) => product.category)
    public products: Product[];
}
