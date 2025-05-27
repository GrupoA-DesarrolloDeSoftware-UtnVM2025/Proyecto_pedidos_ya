import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ZoneEntity} from "../entities/zone.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ZoneEntity])],
  providers: [ZoneService],
  controllers: [ZoneController],
  exports: [TypeOrmModule]
})
export class ZoneModule {}
