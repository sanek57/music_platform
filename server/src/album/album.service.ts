import { Injectable } from '@nestjs/common'
import { Album, AlbumDocument } from './schemas/album.schema'
import { InjectModel } from '@nestjs/mongoose'
import { CreateAlbumDto } from './dto/create-album.dto'
import mongoose, { Model } from 'mongoose'
import { FileService, FileType } from 'src/file/file.service'
import { Track, TrackDocument } from 'src/track/schemas/track.schema'

@Injectable()
export class AlbumService {
  constructor(
    // подключаем модель в сервис
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    // подключили сервис для работы с файлами - DIP
    private fileService: FileService
  ) {}

  async create(dto: CreateAlbumDto, picture: string): Promise<Album> {
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture
    )
    const album = await this.albumModel.create({
      ...dto,
      picture: picturePath,
    })
    return album
  }

  async getAll(count: number = 10, offset: number = 0): Promise<Album[]> {
    const albums = await this.albumModel
      .find()
      .skip(Number(offset))
      .limit(Number(count))

    return albums
  }

  async getOne(id: mongoose.Types.ObjectId): Promise<Album> {
    return (await this.albumModel.findById(id).populate('track')) as Album
  }

  async delete(id: mongoose.Types.ObjectId): Promise<Album | string> {
    const albums = await this.albumModel.findByIdAndDelete({ _id: id })

    if (albums) return albums

    return 'запись не найдена'
  }

  async addTrack(
    idTrack: mongoose.Types.ObjectId,
    idAlbum: mongoose.Types.ObjectId
  ): Promise<Album | string> {
    const album = await this.albumModel.findById(idAlbum)

    if (album) {
      const track = await this.trackModel.create(idTrack)

      album.tracks.push(track._id)
      await album.save()

      return album
    }

    return 'альбом не найден'
  }

  async search(query: string): Promise<Album[]> {
    const albums = await this.albumModel.find({
      // i - case insensitive
      name: { $regex: new RegExp(query, 'i') },
    })

    return albums
  }
}
