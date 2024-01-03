import {
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { Athlete } from "./athlete.entity";

@Entity()
@Unique("discipline_unique_contraint", ["title"])
export class Discipline {
	@PrimaryGeneratedColumn("uuid", {
		primaryKeyConstraintName: "pk_discipline_uuid",
	})
	uuid: string;

	@Column()
	title: string;

	@Column()
	routeParameter: string;

	@OneToMany(
		() => Athlete,
		(athlete) => athlete.discipline,
	)
	athletes: Athlete[];
}
