import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Image {
	constructor(file?: Express.Multer.File) {
		this.filename = file?.originalname;
		this.file = file?.buffer;
		this.mimeType = file?.mimetype;
		this.filesizeInByte = file?.size;
		this.lastModified = new Date();
	}

	updateImageData(file: Express.Multer.File) {
		this.filename = file.originalname;
		this.file = file.buffer;
		this.mimeType = file.mimetype;
		this.filesizeInByte = file.size;
		this.lastModified = new Date();
	}

	@PrimaryGeneratedColumn("uuid", {
		primaryKeyConstraintName: "pk_image_uuid",
	})
	uuid: string;

	@Column()
	filename: string;

	@Column()
	filesizeInByte: number;

	@Column()
	mimeType: string;

	@Column({ type: "bytea" })
	file: Buffer;

	@Column()
	lastModified: Date;

	@BeforeInsert()
	@BeforeUpdate()
	updateLastModified() {
		this.lastModified = new Date();
		this.filesizeInByte = this.file.length;
	}
}
