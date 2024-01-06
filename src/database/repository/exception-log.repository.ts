import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExceptionLog, ExceptionLogDocument } from '../models/exception-log.entity';

@Injectable()
export class ExceptionLogRepository {
    constructor(
        @InjectModel(ExceptionLog.name)
        private readonly exceptionLogModel: Model<ExceptionLogDocument>,
    ) { }

    async saveExceptionLog(data: ExceptionLog): Promise<ExceptionLog> {
        const newExceptionLog = new this.exceptionLogModel(data);
        const savedData = await newExceptionLog.save()
        return savedData;
    }
}