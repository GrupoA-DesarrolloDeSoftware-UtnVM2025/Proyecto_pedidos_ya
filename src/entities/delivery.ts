import { Zone } from "src/entities/zone";
import { PrimaryGeneratedColumn, Column, ManyToMany, Check } from "typeorm";

@Check('"radius" > 0')
@Check('"location" IS NOT NULL')
@Check('"perosonId" IS NOT NULL')
@Check('"status" IS NOT NULL')

export class Delivery {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    perosonId: number;

    @Column("jsonb")
    location: {latitude: number; longitude: number};

    @Column('float')
    radius: number;

    @Column({default: "available"})
    status: string;

    @ManyToMany(() => Zone, (zona) => zona.deliveries)
    zones: Zone[];
}



