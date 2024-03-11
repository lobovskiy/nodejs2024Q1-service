import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  imports: [forwardRef(() => TrackModule), forwardRef(() => ArtistModule)],
  exports: [AlbumService],
  providers: [AlbumService],
})
export class AlbumModule {}
