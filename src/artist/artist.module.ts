import { forwardRef, Module } from '@nestjs/common';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  imports: [forwardRef(() => TrackModule), forwardRef(() => AlbumModule)],
  exports: [ArtistService],
  providers: [ArtistService],
})
export class ArtistModule {}
