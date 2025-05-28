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

    async assignZone(id: number, assignZoneDto: AssignZoneDto): Promise<DeliveryEntity> {
        const delivery = await this.findOne(id)

        // Get all zones
        const zones = await Promise.all(assignZoneDto.zoneIds.map((zoneId) => this.zoneService.findById(zoneId)))

        // Assign zones to delivery
        if (!delivery.zones) {
            delivery.zones = zones
        } else {
            delivery.zones = [...delivery.zones, ...zones]
        }

        return this.deliveryRepository.save(delivery)
    }
}
