import {Body, Controller, Get, Post, Put, Patch, Delete, Query, Param, UseGuards} from '@nestjs/common';
import {ZoneService} from "./zone.service";
import {CreateZoneDto} from "../interfaces/create/createZone.dto";
import {ZoneEntity} from "../entities/zone.entity";
import {PaginationDto} from "../interfaces/pagination.dto";
import {UpdateZoneDto} from "../interfaces/update/updateZone.dto";
import {PatchZoneDto} from "../interfaces/patch/patchZone.dto";
import {AuthGuard} from "../middlewares/auth.middleware";
import {Permissions} from "../middlewares/decorators/permissons.decorator";

@Controller('zone')
export class ZoneController {
    constructor(private readonly zoneService: ZoneService) {}

    @UseGuards(AuthGuard)
    @Permissions(['zone_create'])
    @Post()
    create(@Body() createZoneDto: CreateZoneDto): Promise<ZoneEntity> {
        return this.zoneService.create(createZoneDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['zone_read'])
    @Get()
    findAll(@Query() paginationDto: PaginationDto): Promise<{zones: ZoneEntity[]; total: number}> {
        return this.zoneService.findAll(paginationDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['zone_read'])
    @Get(':id')
    findById(@Param('id') id: number): Promise<ZoneEntity> {
        return this.zoneService.findById(id);
    }

    @UseGuards(AuthGuard)
    @Permissions(['zone_edit'])
    @Put(':id')
    update(@Param('id') id: number, @Body() updateZoneDto: UpdateZoneDto): Promise<ZoneEntity> {
        return this.zoneService.update(id, updateZoneDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['zone_edit'])
    @Patch(':id')
    patch(@Param('id') id: number, @Body() patchZoneDto: PatchZoneDto) {
        return this.zoneService.patch(id, patchZoneDto);
    }

    @UseGuards(AuthGuard)
    @Permissions(['zone_delete'])
    @Delete(':id')
    remove(@Param('id') id: number): Promise<{message: string}> {
        return this.zoneService.remove(id);
    }

}
