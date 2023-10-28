import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class Ergebnis {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	sportart: string;

	@Column()
	ergebnis: number;

	@Column()
	medaille: string;
}
