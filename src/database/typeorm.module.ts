import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from 'src/env/env-config.module';
import { EnvironmentConfigService } from 'src/env/env-config.service';
import { Beer } from './beer.entity';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
      type: 'postgres',
      host: config.getDatabaseHost(),
      port: config.getDatabasePort(),
      password: config.getDatabasePassword(),
      database: config.getDatabaseName(),
      username: config.getDatabaseUser(),
      entities: [Beer],
      synchronize: true,
      schema: process.env.DATABASE_SCHEMA,
      migrationsRun: true,
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
          migrationsDir: 'src/infrastructure/db/migrations',
      },
    } as unknown as TypeOrmModuleOptions);

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions,
        }),
    ],
})
export class TypeOrmConfigModule {}
