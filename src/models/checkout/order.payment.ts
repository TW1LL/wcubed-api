import {Column, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm';
@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column('varchar')
    public stripeToken: string;

    @Column('varchar', { nullable: true})
    public paymentId: string;

    @Column('varchar', { nullable: true})
    public currency: string;

    @Column('varchar', { default: false})
    public paid: boolean;

    @Column('decimal', { nullable: true})
    public amount: number;

    @Column('text', { nullable: true})
    public balanceTrans: string;

    @Column({type:'tinyint', default: 0})
    public deleted?: number;
}
