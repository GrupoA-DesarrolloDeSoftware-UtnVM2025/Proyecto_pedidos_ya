import { Zone } from "src/zone/zone";
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

    @Column()
    location: {latitude: number; longitude: number};

    @Column('float')
    radius: number;

    @Column()
    status: string;

    @ManyToMany(() => Zone, (zona) => zona.deliveries)
    zonas: Zone[];
}



