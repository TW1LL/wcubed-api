import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm';
@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column('varchar')
    public paymentId: string;

    @Column('decimal')
    public amount: number;
    @Column('text')
    public balanceTrans: string;
}
