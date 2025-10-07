import { Module } from '@nestjs/common'
import { TrackModule } from './track/track.module'
import { MongooseModule } from '@nestjs/mongoose'
import { AlbumModule } from './album/album.module'
import { FileModule } from './file/file.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import path from 'path'

@Module({
  imports: [
    // сервис для работы с БД
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017/'),
    // сервис для работы с раздачей статики
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TrackModule,
    AlbumModule,
    FileModule,
  ],
})
export class AppModule {}
