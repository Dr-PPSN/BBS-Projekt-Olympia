import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { Nutzer } from "./nutzer.entity";

@Entity()
@Unique("einladung_unique_contraint", ["nutzer"])
export class Einladung {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	token: string;

	@OneToOne(() => Nutzer)
	@JoinColumn()
	nutzer: Nutzer;

	// TODO: anlagedatum hinzufügen
}
