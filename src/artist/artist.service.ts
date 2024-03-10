import { Injectable } from '@nestjs/common';
import { ArtistEntity } from './artist.model';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';
import { getCollectionEntityIndexById } from '../app.utils';

@Injectable()
export class ArtistService {
  private artists: ArtistEntity[] = [];

  public getAllArtists() {
    return this.artists;
  }

  public getArtist(id: string) {
    const index = getCollectionEntityIndexById(this.artists, id, 'Artist');

    return this.artists[index];
  }

  public createArtist(dto: CreateArtistDto) {
    const artist = new ArtistEntity(dto);

    this.artists.push(artist);

    return artist;
  }

  public updateArtist(id: string, dto: UpdateArtistDto) {
    const index = getCollectionEntityIndexById(this.artists, id, 'Artist');

    this.artists[index] = { ...this.artists[index], ...dto };

    return this.artists[index];
  }

  public deleteArtist(id: string) {
    const deletingArtist = this.getArtist(id);

    this.artists = this.artists.filter(
      (artist) => artist.id !== deletingArtist.id,
    );
  }
}
