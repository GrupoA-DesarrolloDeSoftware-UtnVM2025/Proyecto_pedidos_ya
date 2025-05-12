import { Zona } from "src/zonas/zona";
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

    @ManyToMany(() => Zona, (zona) => zona.deliveries)
    zonas: Zona[];
}



