import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {DeliveryService} from "./delivery.service";
import {CreateDeliveryDto} from "../interfaces/create/createDelivery.dto";
import {DeliveryEntity} from "../entities/delivery.entity";
import {PaginationDto} from "../interfaces/pagination.dto";
import {UpdateDeliveryLocationDto} from "../interfaces/update/updateDeliveryLocation.dto";
import {UpdateDeliveryStatusDto} from "../interfaces/update/updateDeliveryStatus.dto";
import {AssignZoneDto} from "../interfaces/assignZone.dto";
import {FindByProximityDto} from "../interfaces/find/findByProximity.dto";
import {FindByZoneDto} from "../interfaces/find/findByZone.dto";
import {Permissions} from "../middlewares/decorators/permissons.decorator";
import {AuthGuard} from "../middlewares/auth.middleware";

@Controller('delivery')
export class DeliveryController {
    constructor(private readonly deliveryService: DeliveryService) {}

    @UseGuards(AuthGuard)
    @Permissions(['delivery_create'])
    @Post()
    create(@Body() createDeliveryDto: CreateDeliveryDto): Promise<DeliveryEntity> {
        return this.deliveryService.create(createDeliveryDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_read'])
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<{deliveries: DeliveryEntity[]; total: number}> {
        return this.deliveryService.findAll(paginationDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_edit'])
    @Put(":id/location")
    updateLocation(@Param("id") id: number, @Body() updateLocationDto: UpdateDeliveryLocationDto): Promise<DeliveryEntity> {
        return this.deliveryService.updateLocation(id,updateLocationDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_edit'])
    @Put(":id/status")
    updateStatus(@Param("id") id: number, @Body() updateStatusDto: UpdateDeliveryStatusDto): Promise<DeliveryEntity> {
        return this.deliveryService.updateStatus(id, updateStatusDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_delete'])
    @Delete(':id')
    remove(@Param('id') id: number): Promise <{message: string}> {
        return this.deliveryService.remove(id);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_zone_assignment'])
    @Post(":id/assignZone")
    assignZone(@Param('id') id: number, @Body() assignZoneDto: AssignZoneDto): Promise<DeliveryEntity> {
        return this.deliveryService.assignZone(id, assignZoneDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_read'])
    @Get(':id/zones')
    getZones(@Param('id') id: number): Promise<any[]> {
        return this.deliveryService.getZones(id);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_zone_assignment'])
    @Delete(":id/zone/:zoneId")
    removeZone(@Param('id') id: number, @Param('zoneId') zoneId: number): Promise<{message: string}> {
        return this.deliveryService.removeZone(id,zoneId);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_read','delivery_zone_assignment'])
    @Get('findByProximity')
    findByProximity(
        @Query('latitude') latitude: number,
        @Query('longitude') longitude: number,
        @Query('radius') radius: number
    ): Promise<DeliveryEntity[]> {

        const findByProximityDto: FindByProximityDto = { location: { latitude, longitude }, radius}
        return this.deliveryService.findByProximity(findByProximityDto);

    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_read'])
    @Get('findByZone')
    findByZone(@Query('zoneId') id: number): Promise<DeliveryEntity[]> {
        const findByZoneDto: FindByZoneDto = { zoneId: id }
        return this.deliveryService.findByZone(findByZoneDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['delivery_read'])
    @Get(':id')
    findOne(@Param('id') id: number): Promise<DeliveryEntity> {
        return this.deliveryService.findOne(id);
    }

}
