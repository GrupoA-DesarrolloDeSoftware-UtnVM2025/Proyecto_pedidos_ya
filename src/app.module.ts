import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ZoneController } from './zone/zone.controller';
import { ZoneService } from './zone/zone.service';
import { ZoneModule } from './zone/zone.module';

import { DeliveryController } from './delivery/delivery.controller';
import { DeliveryService } from './delivery/delivery.service';
import { DeliveryModule } from './delivery/delivery.module';

@Module({
    imports: [ConfigModule.forRoot({
        isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            ssl: configService.get('DB_SSL') === 'true' 
            ? { rejectUnauthorized: false }  // Azure acepta esto
            : false,
        }),
    }),

    ZoneModule,
    DeliveryModule,
    ],

    controllers: [AppController, ZoneController, DeliveryController],
    providers: [AppService, ZoneService, DeliveryService],
})
export class AppModule {}
