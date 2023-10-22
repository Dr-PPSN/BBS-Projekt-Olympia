import { Sportart } from "src/ergebnisse/entity/sportart.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nutzer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	vorname: string;

	@Column()
	nachname: string;

	@Column()
	email: string;

	@Column()
	passwort: string;

	@Column()
	salt: string;

	@Column({ default: false })
	istAdmin: boolean;

	@OneToOne(() => Sportart)
	sportart?: string;
}
