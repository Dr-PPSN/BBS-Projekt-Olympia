import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
