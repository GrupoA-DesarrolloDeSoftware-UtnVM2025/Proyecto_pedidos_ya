import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {DeliveryService} from "./delivery.service";
import {CreateDeliveryDto} from "../interfaces/create/createDelivery.dto";
import {DeliveryEntity} from "../entities/delivery.entity";
import {PaginationDto} from "../interfaces/pagination.dto";
import {UpdateDeliveryLocationDto} from "../interfaces/update/updateDeliveryLocation.dto";
import {UpdateDeliveryStatusDto} from "../interfaces/update/updateDeliveryStatus.dto";
import {AssignZoneDto} from "../interfaces/assignZone.dto";
import {FindByProximityDto} from "../interfaces/find/findByProximity.dto";
import {ZoneEntity} from "../entities/zone.entity";
import {FindByZoneDto} from "../interfaces/find/findByZone.dto";

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

    @Get('findByProximity')
    findByProximity(
        @Query('latitude') latitude: number,
        @Query('longitude') longitude: number,
        @Query('radius') radius: number
    ): Promise<DeliveryEntity[]> {

        const findByProximityDto: FindByProximityDto = { location: { latitude, longitude }, radius}
        return this.deliveryService.findByProximity(findByProximityDto);

    }

    @Get('findByZone')
    findByZone(@Query('id') id: number): Promise<DeliveryEntity[]> {
        const findByZoneDto: FindByZoneDto = { zoneId: id }
        console.log(findByZoneDto)
        return this.deliveryService.findByZone(findByZoneDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<DeliveryEntity> {
        return this.deliveryService.findOne(id);
    }

}
