import {Column} from 'typeorm';
import {EmbeddableEntity} from 'typeorm/decorator/entity/EmbeddableEntity';
@EmbeddableEntity()
export class Payment {
    @Column('varchar')
    public id: string;
    @Column('decimal')
    public amount: number;
    @Column('text')
    public balanceTrans: string;
}
