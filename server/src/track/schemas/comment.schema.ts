import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Track } from './track.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({ type: { type: mongoose.Types.ObjectId, ref: 'Track' } })
  track: mongoose.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
