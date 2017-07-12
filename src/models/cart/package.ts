import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
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

}
