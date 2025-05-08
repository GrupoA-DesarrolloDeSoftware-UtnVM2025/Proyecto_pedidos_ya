import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { TestModule } from './test/test.module';
import { PruebaController } from './prueba/prueba.controller';
import { DeliveryModule } from './delivery/delivery.module';
import { ZonasModule } from './zonas/zonas.module';
import { PruebaModule } from './prueba/prueba.module';
import { PruebaService } from './prueba/prueba.service';
import { PruebaController } from './prueba/prueba.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        database: 'users',
        username: 'postgres',
        password: 'examplepassword',
        synchronize: true,
        entities,
      }),
      TypeOrmModule.forFeature(entities),
      TestModule,
      PruebaModule,
      ZonasModule,
      DeliveryModule],
  controllers: [AppController, PruebaController],
  providers: [AppService, PruebaService],
})
export class AppModule {}
