import { ZoneEntity } from "src/entities/zone.entity";
import {PrimaryGeneratedColumn, Column, ManyToMany, Check, Entity, JoinTable} from "typeorm";

@Entity({name: "delivery"})
@Check('"radius" > 0')
@Check('"location" IS NOT NULL')
@Check('"perosonId" IS NOT NULL')
@Check('"status" IS NOT NULL')

export class DeliveryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    personId: number;

    @Column("jsonb")
    location: {latitude: number; longitude: number};

    @Column('float')
    radius: number;

    @Column({default: "available"})
    status: string;

    @ManyToMany(() => ZoneEntity, (zone) => zone.deliveries)
    @JoinTable()
    zones: ZoneEntity[];
}



