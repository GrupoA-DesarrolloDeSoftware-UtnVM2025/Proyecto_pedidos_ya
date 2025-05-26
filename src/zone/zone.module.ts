import { Module } from '@nestjs/common';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';

@Module({
  providers: [ZoneService],
  controllers: [ZoneController]
})
export class ZoneModule {}
