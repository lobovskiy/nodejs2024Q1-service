import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumEntity, DTO_ARTIST_ID_FIELD } from './album.model';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';
import {
  getCollectionEntityIndexById,
  validateCollectionEntity,
} from '../app.utils';

@Injectable()
export class AlbumService {
  albums: AlbumEntity[] = [];

  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  public getAllAlbums() {
    return this.albums;
  }

  public getAlbum(id: string) {
    const index = getCollectionEntityIndexById(this.albums, id, 'Album');

    return this.albums[index];
  }

  public createAlbum(dto: CreateAlbumDto) {
    const artistId = dto[DTO_ARTIST_ID_FIELD];

    if (artistId) {
      validateCollectionEntity(
        this.artistService.getAllArtists(),
        artistId,
        'Artists',
        DTO_ARTIST_ID_FIELD,
      );
    }

    const album = new AlbumEntity(dto);

    this.albums.push(album);

    return album;
  }

  public updateAlbum(id: string, dto: UpdateAlbumDto) {
    const index = getCollectionEntityIndexById(this.albums, id, 'Album');

    Object.keys(dto).forEach((key) => {
      if (key === DTO_ARTIST_ID_FIELD) {
        const artistId = dto[key];

        validateCollectionEntity(
          this.artistService.getAllArtists(),
          artistId,
          'Artists',
          key,
        );
      }

      this.albums[index][key] = dto[key];
    });

    return this.albums[index];
  }

  public deleteAlbum(id: string) {
    const deletingAlbum = this.getAlbum(id);

    this.albums = this.albums.filter((album) => album.id !== deletingAlbum.id);
    this.trackService.deleteAlbumIdFromTracks(id);
  }

  public deleteArtistIdFromAlbums(artistId: string) {
    this.albums.forEach((album) => {
      if (album[DTO_ARTIST_ID_FIELD] === artistId) {
        album[DTO_ARTIST_ID_FIELD] = null;
      }
    });
  }
}
