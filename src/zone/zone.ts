import { Delivery } from 'src/delivery/delivery';
import { Entity, PrimaryGeneratedColumn, Column, Check, ManyToMany } from 'typeorm';

@Entity()
@Check('"radius" > 0')
@Check('"location" IS NOT NULL')
@Check('"name" IS NOT NULL')

export class Zone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: {latitude: number; longitude: number};

    @Column('float')
    radius: number;

    @ManyToMany(() => Delivery, (delivery) => delivery.zonas)
    deliveries: Delivery[];
}
