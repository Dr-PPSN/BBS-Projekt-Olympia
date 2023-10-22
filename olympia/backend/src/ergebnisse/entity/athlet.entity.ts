import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Athlet {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	vorname: string;

	@Column()
	nachname: string;

	@Column()
	geschlecht: string;

	@Column()
	land: string;

	@Column()
	geburtsdatum: Date;

	@Column()
	sportart: string;
}
