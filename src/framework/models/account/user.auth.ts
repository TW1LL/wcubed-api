import {Column, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Entity} from 'typeorm/decorator/entity/Entity';
import {User} from './user';
@Entity()
export class UserAuth {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne((type) => User)
    @JoinColumn()
    public user: User;

    @Column('int')
    public rank: number;

    get RankTitle() {
        return rankTitle[rankTitle[this.rank]];
    }

    @Column('varchar')
    public password: string;
}
export enum rankTitle {
    Guest,
    User,
    Mod,
    Admin,
    Owner
}
