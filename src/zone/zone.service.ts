import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {Zone} from "../entities/zone";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateZoneDto} from "../interfaces/create/create-zone-dto";
import {PaginationDto} from "../interfaces/pagination.dto";

@Injectable()
export class ZoneService {
    private zoneRepository: Repository<Zone>;

    constructor(
        @InjectRepository(Zone)
        zoneRepository: Repository<Zone>,
    ) {
        this.zoneRepository = zoneRepository;
    }

    //Guardar una nueva zona
    async create (createZoneDto: CreateZoneDto): Promise<Zone> {
        const zone = this.zoneRepository.create(createZoneDto);
        return this.zoneRepository.save(zone);
    }

    //Buscar todas las zonas empleando paginacion
    async findAll(paginationDto: PaginationDto): Promise<{zones: Zone[]; total: number}> {
        const {limit, offset} = paginationDto;

        const [zones, total] = await this.zoneRepository.findAndCount({
            take: limit,
            skip: offset,
        })
        return {zones, total};
    }

    async findById(id: number): Promise<Zone> {
        const zone = await this.zoneRepository.findOne({where: {id} });
        if (!zone) {
            throw new NotFoundException(`Zona con id: ${id} no encontrada`);
        }
        return zone;
    }


}
