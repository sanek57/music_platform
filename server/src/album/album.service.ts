import { Injectable } from '@nestjs/common'
import { Album, AlbumDocument } from './schemas/album.schema'
import { InjectModel } from '@nestjs/mongoose'
import { CreateAlbumDto } from './dto/create-album.dto'
import mongoose, { Model } from 'mongoose'
import { FileService, FileType } from 'src/file/file.service'
import { Track, TrackDocument } from 'src/track/schemas/track.schema'
import { AddTrackDto } from './dto/add-track.dto'

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
    try {
      const picturePath = await this.fileService.createFile(
        FileType.IMAGE,
        picture
      )
      const album = await this.albumModel.create({
        ...dto,
        picture: picturePath,
      })
      return album
    } catch (error) {
      console.log(error)
    }
    return {} as Album
  }

  async getAll(count: number = 10, offset: number = 0): Promise<Album[]> {
    try {
      const albums = await this.albumModel
        .find()
        .skip(Number(offset))
        .limit(Number(count))

      return albums
    } catch (error) {
      console.log(error)
    }

    return []
  }

  async getOne(id: mongoose.Types.ObjectId): Promise<Album> {
    return (await this.albumModel.findById(id).populate('track')) as Album
  }

  async delete(id: mongoose.Types.ObjectId): Promise<Album | string> {
    try {
      const albums = await this.albumModel.findByIdAndDelete({ _id: id })

      if (albums) return albums
    } catch (error) {
      console.log(error)
    }

    return 'запись не найдена'
  }

  async addTrack(dto: AddTrackDto): Promise<Album | string> {
    try {
      const album = await this.albumModel.findById(dto.idAlbum)

      if (album) {
        const track = await this.trackModel.findById(dto.idTrack)

        if (track) {
          album.tracks.push(track._id)
          await album.save()

          return album
        }
      }
    } catch (error) {
      console.log(error)
    }

    return 'альбом не найден'
  }

  async search(query: string): Promise<Album[]> {
    try {
      const albums = await this.albumModel.find({
        // i - case insensitive
        name: { $regex: new RegExp(query, 'i') },
      })

      return albums
    } catch (error) {
      console.log(error)
    }
    return []
  }
}
