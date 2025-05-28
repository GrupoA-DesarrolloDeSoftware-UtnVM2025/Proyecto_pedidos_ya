import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DeliveryEntity} from "../entities/delivery.entity";
import {ZoneModule} from "../zone/zone.module";
import {ZoneService} from "../zone/zone.service";
import {ZoneEntity} from "../entities/zone.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryEntity, ZoneEntity]), ZoneModule],
  providers: [DeliveryService, ZoneService],
  controllers: [DeliveryController],
  exports: [TypeOrmModule]
})
export class DeliveryModule {}
