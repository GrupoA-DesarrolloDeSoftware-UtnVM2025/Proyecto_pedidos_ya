import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

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
      TypeOrmModule.forFeature(entities)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
