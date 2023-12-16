import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SportsResult {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	discipline: string;

	@Column()
	values: number;

	@Column()
	medal: string;
}
