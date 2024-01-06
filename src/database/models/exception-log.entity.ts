import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ collection: "exception-logs" })
export class ExceptionLog extends Document {
    @Prop()
    method: string;

    @Prop()
    url: string;

    @Prop({ type: SchemaTypes.Mixed })
    params: Record<string, any>;

    @Prop({ type: SchemaTypes.Mixed })
    query: Record<string, any>;

    @Prop({ type: SchemaTypes.Mixed })
    body: Record<string, any>;

    @Prop({ type: SchemaTypes.Mixed })
    user: Record<string, any>;

    @Prop({ type: SchemaTypes.Mixed })
    session: Record<string, any>;

    @Prop({ type: SchemaTypes.Mixed })
    headers: Record<string, any>;

    @Prop({ type: SchemaTypes.Mixed })
    exception: Record<string, any>;

    @Prop()
    token: String;

    @Prop()
    platform: String;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;

}

export type ExceptionLogDocument = ExceptionLog & Document;

export const ExceptionLogSchema = SchemaFactory.createForClass(ExceptionLog);
