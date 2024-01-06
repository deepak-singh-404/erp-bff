import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/models/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ExceptionLogRepository } from 'src/database/repository/exception-log.repository';
import { ExceptionLog, ExceptionLogSchema } from 'src/database/models/exception-log.entity';
import { UserRepository } from 'src/database/repository/user.repository';
import { SerialNumberRepository } from 'src/database/repository/serial-number.repository';
import { SerialNumber, SerialNumberSchema } from 'src/database/models/serial-number.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: ExceptionLog.name, schema: ExceptionLogSchema },
            { name: SerialNumber.name, schema: SerialNumberSchema }
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService, ExceptionLogRepository, UserRepository, SerialNumberRepository],
})
export class AuthModule { }
