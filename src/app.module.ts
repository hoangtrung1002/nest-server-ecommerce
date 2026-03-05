import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import pgConfig from './configs/database.config';
import { AddressModule } from './modules/address/address.module';
import { CategoryModule } from './modules/category/category.module';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { TagModule } from './modules/tag/tag.module';
import { StaffModule } from './modules/staff/staff.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    ProductModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions =>
        pgConfig(configService),
    }),
    CategoryModule,
    CustomerModule,
    AddressModule,
    TagModule,
    StaffModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
