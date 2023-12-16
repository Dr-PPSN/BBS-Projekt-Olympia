import {
	Column,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { Discipline } from "./discipline.entity";

@Entity()
@Unique(["firstName", "lastName", "birthDate", "country"])
export class Athlete {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	gender: string;

	@Column()
	country: string;

	@Column()
	birthDate: Date;

	@Column()
	@OneToOne(() => Discipline)
	discipline: string;
}
