import { ObjectId } from 'mongoose'

export class AddTrackDto {
  readonly idTrack: ObjectId
  readonly idAlbum: ObjectId
}
