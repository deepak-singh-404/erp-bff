import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from "@nestjs/config";


import properties from "config/properties";
import { UserModule } from './modules/user/user.module';

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

    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
