import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Tournament } from './Tournament';

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    gender: string;

    @Column()
    categoryName: string;

    @ManyToMany(() => Tournament, (tournament) => tournament.categories)
    tournaments: Tournament[];
}
