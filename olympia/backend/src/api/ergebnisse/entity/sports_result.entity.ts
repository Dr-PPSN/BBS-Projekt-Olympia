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
	uuid: number;

	@OneToOne(
		() => Athlete,
		(athlete) => athlete.sportsResult,
	)
	@JoinColumn()
	athlete: Athlete;

	@Column()
	value: number;

	@Column({
		type: "enum",
		enum: Medals,
		default: null,
	})
	medal: Medals;
}
