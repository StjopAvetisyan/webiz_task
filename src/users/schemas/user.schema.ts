import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserStatuses } from '../enums';
import * as mongoose from 'mongoose';

@Schema()
export class User extends mongoose.Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop({ default: false, type: mongoose.Schema.Types.Mixed })
  status: UserStatuses;
}

export const UserSchema = SchemaFactory.createForClass(User);
