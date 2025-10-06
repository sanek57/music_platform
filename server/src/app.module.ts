import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:password@localhost:27017/'),
    TrackModule,
    AlbumModule,
  ],
})
export class AppModule {}
