import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Athlete } from "./athlete.entity";

export enum Medals {
	GOLD = "gold",
	SILVER = "silver",
	BRONZE = "bronze",
}

@Entity()
export class SportsResult {
	@PrimaryGeneratedColumn("uuid", {
		primaryKeyConstraintName: "pk_sports_result_uuid",
	})
	uuid: string;

	@OneToOne(
		() => Athlete,
		(athlete) => athlete.sportsResult,
	)
	@JoinColumn()
	athlete: Athlete;

	@Column({
		type: "double precision",
		nullable: true,
	})
	value: number;

	@Column({
		type: "enum",
		enum: Medals,
		default: null,
	})
	medal: Medals;
}
