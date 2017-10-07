import {Column, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm';
import {User} from './user';
@Entity()
export class UserAuth {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne((type) => User)
    @JoinColumn()
    public user: User;

    @Column({type:'int', default: 0})
    public rank: number;

    get RankTitle() {
        return rankTitle[rankTitle[this.rank]];
    }

    @Column({type:'varchar', default: ''})
    public password: string;
}
export enum rankTitle {
    Guest,
    User,
    Mod,
    Admin,
    Owner
}
