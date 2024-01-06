import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: "serial-numbers" })
export class SerialNumber {
    @Prop({ required: true, unique: true })
    key: string;

    @Prop({ required: true, default: 1 })
    value: number;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}


export type SerialNumberDocument = SerialNumber & Document;

export const SerialNumberSchema = SchemaFactory.createForClass(SerialNumber);
