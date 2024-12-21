import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  display_name: string;

  @Prop({ required: false })
  dob: string; 

  @Prop({ default: 0 })
  is_email_verified: number; 

  @Prop({ default: Date.now })
  created_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);

