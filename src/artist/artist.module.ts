import { forwardRef, Module } from '@nestjs/common';
import { FavsModule } from '../favs/favs.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  imports: [forwardRef(() => FavsModule)],
  exports: [ArtistService],
  providers: [ArtistService],
})
export class ArtistModule {}
