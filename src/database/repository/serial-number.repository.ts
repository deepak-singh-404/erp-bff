import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SerialNumber, SerialNumberDocument } from '../models/serial-number.entity';

@Injectable()
export class SerialNumberRepository {
    constructor(
        @InjectModel(SerialNumber.name)
        private readonly serialNumberModel: Model<SerialNumberDocument>,
    ) { }

    async getSerialNumber(key: string): Promise<number> {
        const serialNumber = await this.serialNumberModel.findOneAndUpdate({ key: key }, { $inc: { value: 1 } }, { upsert: true, new: true });
        return serialNumber.value
    }
}
