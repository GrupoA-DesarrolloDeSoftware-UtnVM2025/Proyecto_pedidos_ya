import { DeliveryEntity } from 'src/entities/delivery.entity';
import { Entity, PrimaryGeneratedColumn, Column, Check, ManyToMany } from 'typeorm';

@Entity({name: "zone"})
@Check('"radius" > 0')
@Check('"location" IS NOT NULL')
@Check('"name" IS NOT NULL')

export class ZoneEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("jsonb")
    location: {latitude: number; longitude: number};

    @Column('float')
    radius: number;

    @ManyToMany(() => DeliveryEntity, (delivery) => delivery.zones)
    deliveries: DeliveryEntity[];
}
