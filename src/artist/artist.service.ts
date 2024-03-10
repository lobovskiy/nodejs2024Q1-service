import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistEntity } from './artist.model';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';

@Injectable()
export class ArtistService {
  private artists: ArtistEntity[] = [];

  public getAllArtists() {
    return this.artists;
  }

  public getArtist(id: string) {
    const index = this.getArtistIndexByArtistId(id);

    return this.artists[index];
  }

  public createArtist(dto: CreateArtistDto) {
    const artist = new ArtistEntity(dto);

    this.artists.push(artist);

    return artist;
  }

  public updateArtist(id: string, dto: UpdateArtistDto) {
    const index = this.getArtistIndexByArtistId(id);

    this.artists[index] = { ...this.artists[index], ...dto };

    return this.artists[index];
  }

  public deleteArtist(id: string) {
    const deletingArtist = this.getArtist(id);

    this.artists = this.artists.filter(
      (artist) => artist.id !== deletingArtist.id,
    );
  }

  private getArtistIndexByArtistId(id: string) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    if (artistIndex < 0) {
      throw new NotFoundException(`Artist ${id} not found`);
    }

    return artistIndex;
  }
}
