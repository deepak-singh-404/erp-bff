import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";


import properties from "config/properties";
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [

    //Load all config from .env
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [properties]
    }),

    //Connect to Mongodb
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('properties.MONGODB_CONNECTION_URI')
      }),
      inject: [ConfigService]
    }),

    JwtModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [{
    provide: APP_FILTER,
    useClass: CustomExceptionFilter,
  },],
})
export class AppModule { }
