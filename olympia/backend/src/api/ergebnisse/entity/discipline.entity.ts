import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discipline {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;
}
