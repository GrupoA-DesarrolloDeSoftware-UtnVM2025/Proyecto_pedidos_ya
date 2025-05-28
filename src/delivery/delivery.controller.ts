import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {DeliveryService} from "./delivery.service";
import {CreateDeliveryDto} from "../interfaces/create/createDelivery.dto";
import {DeliveryEntity} from "../entities/delivery.entity";
import {PaginationDto} from "../interfaces/pagination.dto";
import {UpdateDeliveryLocationDto} from "../interfaces/update/updateDeliveryLocation.dto";
import {UpdateDeliveryStatusDto} from "../interfaces/update/updateDeliveryStatus.dto";
import {AssignZoneDto} from "../interfaces/assignZone.dto";

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @Post()
    create(@Body() createDeliveryDto: CreateDeliveryDto): Promise<DeliveryEntity> {
        return this.deliveryService.create(createDeliveryDto);
    }

    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<{deliveries: DeliveryEntity[]; total: number}> {
        return this.deliveryService.findAll(paginationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<DeliveryEntity> {
        return this.deliveryService.findOne(id);
    }

    @Put(":id/location")
    updateLocation(@Param("id") id: number, @Body() updateLocationDto: UpdateDeliveryLocationDto): Promise<DeliveryEntity> {
        return this.deliveryService.updateLocation(id,updateLocationDto);
    }

    @Put("id/status")
    updateStatus(@Param("id") id: number, @Body() updateStatusDto: UpdateDeliveryStatusDto): Promise<DeliveryEntity> {
        return this.deliveryService.updateStatus(id, updateStatusDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise <{message: string}> {
        return this.deliveryService.remove(id);
    }

    @Post(":id/assignZone")
    assignZone(@Param('id') id: number, @Body() assignZoneDto: AssignZoneDto): Promise<DeliveryEntity> {
        return this.deliveryService.assignZone(id, assignZoneDto);
    }

    @Get(':id/zones')
    getZones(@Param('id') id: number): Promise<any[]> {
        return this.deliveryService.getZones(id);
    }

    @Delete(":id/zone/:zoneId")
    removeZone(@Param('id') id: number, @Param('zoneId') zoneId: number): Promise<{message: string}> {
        return this.deliveryService.removeZone(id,zoneId);
    }

}
