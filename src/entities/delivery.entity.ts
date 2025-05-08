import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DeliveryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  personId: number;

  @Column()
  status: string;

  @Column()
  radius: string;

  @Column()
  location: string;

  @Column()
  zone: string;
}
