import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PageDocument = Page & Document;

@Schema()
export class Page extends Document {
    @Prop({ required: true, index: true, unique: true })
    url: string;
}

export const PageSchema = SchemaFactory.createForClass(Page);
