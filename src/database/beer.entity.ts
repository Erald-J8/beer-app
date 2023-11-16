import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    type: string;

    @Column({ type: 'decimal' })
    rating: number;
}
