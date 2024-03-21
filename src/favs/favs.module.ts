import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { DatabaseModule } from '../database/database.module';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [forwardRef(() => ArtistModule), DatabaseModule],
  controllers: [FavsController],
  exports: [FavsService],
  providers: [FavsService],
})
export class FavsModule {}
