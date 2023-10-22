import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["vorname", "nachname", "geburtsdatum", "land"])
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
