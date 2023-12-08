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
@Unique("change_password_token_unique_contraint", ["nutzer"])
export class ChangePasswordToken {
	@PrimaryGeneratedColumn("uuid")
	uuid: string;

	@OneToOne(() => Nutzer)
	@JoinColumn()
	nutzer: Nutzer;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;
}
