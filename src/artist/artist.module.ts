import { forwardRef, Module } from '@nestjs/common';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  exports: [ArtistService],
  providers: [ArtistService],
})
export class ArtistModule {}
