import {Column} from 'typeorm';
import {EmbeddableEntity} from 'typeorm/decorator/entity/EmbeddableEntity';
@EmbeddableEntity()

export class Address {
    @Column('varchar')
    public firstName: string;
    @Column('varchar')
    public lastName: string;
    @Column('varchar')
    public companyName?: string;
    @Column('varchar')
    public streetAddress: string;
    @Column('varchar')
    public streetAddress2?: string;
    @Column('varchar')
    public city: string;
    @Column('varchar')
    public state: string;
    @Column('varchar')
    public zipCode: string;
    @Column('varchar')
    public country: string;
    @Column('varchar')
    public phone: string;
    @Column('varchar')
    public email: string;
}
