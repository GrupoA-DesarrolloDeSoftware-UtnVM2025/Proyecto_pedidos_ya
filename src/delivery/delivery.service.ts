import {Injectable, NotFoundException} from '@nestjs/common';
import {ZoneService} from "../zone/zone.service";
import {InjectRepository} from "@nestjs/typeorm";
import {DeliveryEntity} from "../entities/delivery.entity";
import {Repository} from "typeorm";
import {CreateDeliveryDto} from "../interfaces/create/createDelivery.dto";
import {PaginationDto} from "../interfaces/pagination.dto";
import {UpdateDeliveryLocationDto} from "../interfaces/update/updateDeliveryLocation.dto";
import {UpdateDeliveryStatusDto} from "../interfaces/update/updateDeliveryStatus.dto";
import {AssignZoneDto} from "../interfaces/assignZone.dto";
import {FindByProximityDto} from "../interfaces/find/findByProximity.dto";
import {FindByZoneDto} from "../interfaces/find/findByZone.dto";

@Injectable()
export class DeliveryService {
    constructor(
        private zoneService: ZoneService,
        @InjectRepository(DeliveryEntity)
        private deliveryRepository: Repository<DeliveryEntity>
    ) {}

    async create(createDeliveryDto: CreateDeliveryDto): Promise<DeliveryEntity> {
        const delivery = this.deliveryRepository.create({...createDeliveryDto, status: "available"});
        return this.deliveryRepository.save(delivery);
    }

    async findAll(paginationDto: PaginationDto): Promise<{deliveries: DeliveryEntity[]; total: number}> {
        const {limit, offset} = paginationDto;

        const [deliveries, total] = await this.deliveryRepository.findAndCount({
            take: limit,
            skip: offset,
            relations: ['zones'],
        })
        return {deliveries, total};
    }

    async findOne(id: number): Promise <DeliveryEntity> {
        const delivery = await  this.deliveryRepository.findOne({where: {id}, relations: ["zones"]})
        if (!delivery) {throw new NotFoundException(`Delivery con id: ${id} no encontrado`)}
        return delivery
    }

    async updateLocation(id: number, updateLocationDto: UpdateDeliveryLocationDto): Promise<DeliveryEntity> {
        const delivery = await this.findOne(id)
        delivery.location = updateLocationDto.location
        return this.deliveryRepository.save(delivery)
    }

    async updateStatus(id: number, updateStatusDto: UpdateDeliveryStatusDto): Promise<DeliveryEntity> {
        const delivery = await this.findOne(id)
        delivery.status = updateStatusDto.status
        return this.deliveryRepository.save(delivery)
    }

    async remove(id: number): Promise<{message: string}> {
        const delivery = await this.findOne(id);
        await this.deliveryRepository.remove(delivery);
        return {message: "Delivery deleted"}
    }

    async assignZone(id: number, assignZoneDto: AssignZoneDto): Promise<DeliveryEntity> {
        const delivery = await this.findOne(id);

        // Get all zones
        const zones = await Promise.all(assignZoneDto.zoneIds.map((zoneId) => this.zoneService.findById(zoneId)));

        // Assign zones to delivery
        if (!delivery.zones) {
            delivery.zones = zones
        } else {
            delivery.zones = [...delivery.zones, ...zones]
        }

        return this.deliveryRepository.save(delivery);
    }

    async getZones(id: number): Promise<any[]> {
        const delivery = await this.findOne(id);
        return delivery.zones
    }

    async removeZone(id: number, zoneId: number): Promise<{message: string}> {
        const delivery = await this.findOne(id)

        // Verify zone exists
        await this.zoneService.findById(zoneId)

        // Remove zone from delivery
        delivery.zones = delivery.zones.filter((zone) => zone.id !== zoneId)

        await this.deliveryRepository.save(delivery)
        return { message: "Zone removed from delivery" }
    }

    async findByProximity(findByProximityDto: FindByProximityDto): Promise<DeliveryEntity[]> {
        const {location, radius} = findByProximityDto;

        const deliveries = await this.deliveryRepository.find({relations: ["zones"]});


        const filteredDeliveries = deliveries.filter((delivery) => {
            const distance = this.calculateDistance(location.latitude, location.longitude, delivery.location.latitude, delivery.location.longitude)
            return distance <= radius
        })


        return filteredDeliveries.sort((a, b) => {
            const distanceA = this.calculateDistance(location.latitude, location.longitude, a.location.latitude, a.location.longitude)
            const distanceB = this.calculateDistance(location.latitude, location.longitude, b.location.latitude, b.location.longitude)
            return distanceA - distanceB
        })
    }

    async findByZone(findByZoneDto: FindByZoneDto): Promise<DeliveryEntity[]> {
        const {zoneId} = findByZoneDto;

        await this.zoneService.findById(zoneId);

        return await this.deliveryRepository.createQueryBuilder("delivery").innerJoinAndSelect("delivery.zones", "zone").where("zone.id = :zoneId", {zoneId}).getMany();
    }


    private calculateDistance(lat1: number, long1: number, lat2: number, long2: number): number {
        const radius = 6371 //Radio de la tierra en km
        const dLat = this.deg2rad(lat2-lat1);
        const dLon = this.deg2rad(long2-long1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return radius * c
    }

    private deg2rad(deg: number): number {
        return deg * (Math.PI /180)
    }


}
