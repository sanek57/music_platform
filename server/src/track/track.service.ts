import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { Track, TrackDocument } from './schemas/track.schema'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { CreateTrackDto } from './dto/create-track.dto'
import { CreateCommentDto } from './dto/create-comment.dto'
import { FileService, FileType } from 'src/file/file.service'

@Injectable()
export class TrackService {
  constructor(
    // подключаем модель в сервис
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    // подключили сервис для работы с файлами - DIP
    private fileService: FileService
  ) {}

  async create(
    dto: CreateTrackDto,
    picture: string,
    audio: string
  ): Promise<Track> {
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio)
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture
    )

    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    })
    return track
  }

  async getAll(count: number = 10, offset: number = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count))

    return tracks
  }

  async getOne(id: mongoose.Types.ObjectId): Promise<Track> {
    return (await this.trackModel.findById(id).populate('comments')) as Track
  }

  async delete(id: mongoose.Types.ObjectId): Promise<Track | string> {
    const track = await this.trackModel.findByIdAndDelete({ _id: id })

    if (track) return track

    return 'запись не найдена'
  }

  async addComment(dto: CreateCommentDto): Promise<Comment | string> {
    const track = await this.trackModel.findById(dto.trackId)

    if (track) {
      const comment = await this.commentModel.create({ ...dto })

      if (comment) {
        track.comments.push(comment._id)
        await track.save()

        return comment
      }
    }

    return 'трек не найден'
  }

  async listen(id: mongoose.Types.ObjectId) {
    const track = await this.trackModel.findById(id)

    if (track) {
      track.listens += 1
      track.save()
    }
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      // i - case insensitive
      name: { $regex: new RegExp(query, 'i') },
    })

    return tracks
  }
}
