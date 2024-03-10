import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  imports: [forwardRef(() => ArtistModule), forwardRef(() => AlbumModule)],
  exports: [TrackService],
  providers: [TrackService],
})
export class TrackModule {}
