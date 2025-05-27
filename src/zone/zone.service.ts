import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {ZoneEntity} from "../entities/zone.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateZoneDto} from "../interfaces/create/create-zone-dto";
import {UpdateZoneDto} from "../interfaces/update/update-zone.dto";
import {PaginationDto} from "../interfaces/pagination.dto";
import {PatchZoneDto} from "../interfaces/patch/patch-zone.dto";

@Injectable()
export class ZoneService {
    private zoneRepository: Repository<ZoneEntity>;

    constructor(
        @InjectRepository(ZoneEntity)
        zoneRepository: Repository<ZoneEntity>,
    ) {
        this.zoneRepository = zoneRepository;
    }

    //Guardar una nueva zona
    async create (createZoneDto: CreateZoneDto): Promise<ZoneEntity> {
        const zone = this.zoneRepository.create(createZoneDto);
        return this.zoneRepository.save(zone);
    }

    //Buscar todas las zonas empleando paginacion
    async findAll(paginationDto: PaginationDto): Promise<{zones: ZoneEntity[]; total: number}> {
        const {limit, offset} = paginationDto;

        const [zones, total] = await this.zoneRepository.findAndCount({
            take: limit,
            skip: offset,
        })
        return {zones, total};
    }

    async findById(id: number): Promise<ZoneEntity> {
        const zone = await this.zoneRepository.findOne({where: {id} });
        if (!zone) {
            throw new NotFoundException(`Zona con id: ${id} no encontrada`);
        }
        return zone;
    }

    async update(id: number, updateZoneDto: UpdateZoneDto): Promise<ZoneEntity> {
        const zone = await this.findById(id);
        this.zoneRepository.merge(zone, updateZoneDto);
        return this.zoneRepository.save(zone);
    }

    async patch(id: number, patchZoneDto: PatchZoneDto): Promise<ZoneEntity> {
        const zone = await this.findById(id);
        this.zoneRepository.merge(zone, patchZoneDto);
        return this.zoneRepository.save(zone);
    }

    async remove(id: number): Promise<{ message: string }> {
        const zone = await this.findById(id);
        await this.zoneRepository.remove(zone);
        return {message: 'Zona eliminada'};
    }


}
