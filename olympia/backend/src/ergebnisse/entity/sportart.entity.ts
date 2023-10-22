import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sportart {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	bezeichnung: string;
}
