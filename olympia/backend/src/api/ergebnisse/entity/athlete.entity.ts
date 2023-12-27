import {
	Column,
	Entity,
	ManyToOne,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { Discipline } from "./discipline.entity";
import { SportsResult } from "./sports_result.entity";

@Entity()
@Unique("athlete_unique_contraint", [
	"firstName",
	"lastName",
	"birthDate",
	"country",
])
export class Athlete {
	@PrimaryGeneratedColumn("uuid", {
		primaryKeyConstraintName: "pk_athlete_uuid",
	})
	uuid: string;

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

	@ManyToOne(
		() => Discipline,
		(discipline) => discipline.athletes,
	)
	discipline: Discipline;

	@OneToOne(
		() => SportsResult,
		(sportsResult) => sportsResult.athlete,
	)
	sportsResult: SportsResult;
}
