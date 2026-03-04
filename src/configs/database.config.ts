import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

function pgConfig(configService: ConfigService): TypeOrmModuleOptions {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  return {
    url: configService.get<string>('DB_URL'),
    type: 'postgres',
    port: configService.get<number>('DB_PORT'), // default Pg
    entities: [path.join(__dirname, '/../modules/**/*.entity{.ts,.js}')],
    synchronize: !isProduction,
  };
}

export default pgConfig;
