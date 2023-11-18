import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Beer {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    name: string;

    @Column('varchar')
    type: string;

    @Column({ type: 'decimal' })
    rating: number;

    @Column({ default: 1 })
    totalRatings: number

    @BeforeInsert()
    setDefaultTotalRatings() {
        // Set the default value of totalRatings to 1 before inserting into the database
        this.totalRatings = 1
    }
}
