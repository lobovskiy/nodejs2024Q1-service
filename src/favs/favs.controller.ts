import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.getAllFavs();
  }

  @Post('artist/:id')
  addArtistToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addArtistToFavs(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteArtistFromFavs(id);
  }

  @Post('album/:id')
  addAlbumsToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addAlbumToFavs(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteAlbumFromFavs(id);
  }

  @Post('track/:id')
  addTracksToFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.addTrackToFavs(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavs(@Param('id', ParseUUIDPipe) id: string) {
    return this.favsService.deleteTrackFromFavs(id);
  }
}
