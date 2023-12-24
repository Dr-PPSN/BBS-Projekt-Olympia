import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	Unique,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
@Unique("change_password_token_unique_contraint", ["user"])
export class ChangePasswordToken {
	@PrimaryGeneratedColumn("uuid", {
		primaryKeyConstraintName: "pk_change_password_token_uuid",
	})
	uuid: string;

	@OneToOne(() => User)
	@JoinColumn()
	user: User;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	createdAt: Date;
}
