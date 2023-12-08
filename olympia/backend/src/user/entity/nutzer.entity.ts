import { Sportart } from "src/api/ergebnisse/entity/sportart.entity";
import {
	Column,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";

@Entity()
@Unique("nutzer_unique_contraint", ["email"])
export class Nutzer {
	@PrimaryGeneratedColumn("uuid")
	uuid: string;

	@Column()
	vorname: string;

	@Column()
	nachname: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	passwort: string;

	@Column({ nullable: true })
	salt: string;

	@Column({ default: false })
	istAdmin: boolean;

	@OneToOne(() => Sportart)
	sportart?: string;
}
