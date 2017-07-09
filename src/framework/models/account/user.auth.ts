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

    @Column('varchar')
    public password: string;
}
