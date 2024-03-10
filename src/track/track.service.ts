import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import {
  DTO_ALBUM_ID_FIELD,
  DTO_ARTIST_ID_FIELD,
  TrackEntity,
} from './track.model';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import {
  getCollectionEntityIndexById,
  validateCollectionEntity,
  validateUuid,
} from '../app.utils';

@Injectable()
export class TrackService {
  private tracks: TrackEntity[] = [];

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  public getAllTracks() {
    return this.tracks;
  }

  public getTrack(id: string) {
    const index = getCollectionEntityIndexById(this.tracks, id, 'Track');

    return this.tracks[index];
  }

  public createTrack(dto: CreateTrackDto) {
    const artistId = dto[DTO_ARTIST_ID_FIELD];
    const albumId = dto[DTO_ALBUM_ID_FIELD];

    if (artistId) {
      validateCollectionEntity(
        this.artistService.getAllArtists(),
        artistId,
        'Artists',
        DTO_ARTIST_ID_FIELD,
      );
    }

    if (albumId) {
      validateCollectionEntity(
        this.albumService.getAllAlbums(),
        albumId,
        'Albums',
        DTO_ALBUM_ID_FIELD,
      );
    }

    const track = new TrackEntity(dto);

    this.tracks.push(track);

    return track;
  }

  public updateTrack(id: string, dto: UpdateTrackDto) {
    const index = getCollectionEntityIndexById(this.tracks, id, 'Track');

    Object.keys(dto).forEach((key) => {
      if (key === DTO_ARTIST_ID_FIELD || key === DTO_ALBUM_ID_FIELD) {
        validateUuid(dto[key], key);
      }

      this.tracks[index][key] = dto[key];
    });

    return this.tracks[index];
  }

  public deleteTrack(id: string) {
    const deletingTrack = this.getTrack(id);

    this.tracks = this.tracks.filter((track) => track.id !== deletingTrack.id);
  }

  public deleteAlbumIdFromTracks(albumId: string) {
    this.tracks.forEach((track) => {
      if (track[DTO_ALBUM_ID_FIELD] === albumId) {
        track[DTO_ALBUM_ID_FIELD] = null;
      }
    });
  }

  public deleteArtistIdFromTracks(artistId: string) {
    this.tracks.forEach((track) => {
      if (track[DTO_ARTIST_ID_FIELD] === artistId) {
        track[DTO_ARTIST_ID_FIELD] = null;
      }
    });
  }
}
