import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  imports: [DatabaseModule],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
