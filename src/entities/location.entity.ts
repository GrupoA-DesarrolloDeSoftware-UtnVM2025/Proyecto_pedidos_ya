import { BaseEntity, Column, Entity } from "typeorm";

@Entity()
export class LocationEntity extends BaseEntity {
  @Column()
  lat: string;

  @Column()
  lng: string;
}
