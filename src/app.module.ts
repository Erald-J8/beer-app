import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeerController } from './controllers/beer.controller';
import { Beer } from './database/beer.entity';
import { TypeOrmConfigModule } from './database/typeorm.module';
import { BeerService } from './services/beer.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Beer])],
    controllers: [AppController, BeerController],
    providers: [AppService, BeerService],
})
export class AppModule { }
