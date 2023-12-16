import { Discipline } from "src/api/ergebnisse/entity/discipline.entity";
import {
	Column,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";

@Entity()
@Unique("user_unique_contraint", ["email"])
export class User {
	@PrimaryGeneratedColumn("uuid")
	uuid: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Column()
	email: string;

	@Column({ nullable: true })
	password: string;

	@Column({ nullable: true })
	salt: string;

	@Column({ default: false })
	isAdmin: boolean;

	@OneToOne(() => Discipline)
	discipline?: string;
}
