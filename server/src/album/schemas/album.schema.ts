import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Track } from 'src/track/schemas/track.schema'

export type AlbumDocument = HydratedDocument<Album>

@Schema()
export class Album {
  @Prop()
  name: string

  @Prop()
  author: string

  @Prop()
  picture: string

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Track' }] })
  tracks: mongoose.Types.ObjectId[]
}

export const AlbumSchema = SchemaFactory.createForClass(Album)
