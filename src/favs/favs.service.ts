import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { IFavorites } from './favs.model';
import { validateCollectionEntity } from '../app.utils';
import { getFavsResponseMessage } from './favs.utils';

@Injectable()
export class FavsService {
  favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  public getAllFavs() {
    return {
      artists: this.artistService.getArtist(this.favorites.artists),
      albums: this.albumService.getAlbum(this.favorites.albums),
      tracks: this.trackService.getTrack(this.favorites.tracks),
    };
  }

  public addArtistToFavs(artistId: string) {
    validateCollectionEntity(
      this.artistService.getAllArtists(),
      artistId,
      'Artists',
    );

    this.favorites.artists.push(artistId);

    return getFavsResponseMessage('Artist', artistId);
  }

  public deleteArtistFromFavs(artistId: string) {
    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artistId,
    );
  }

  public addAlbumToFavs(albumId: string) {
    validateCollectionEntity(
      this.albumService.getAllAlbums(),
      albumId,
      'Albums',
    );

    this.favorites.albums.push(albumId);

    return getFavsResponseMessage('Album', albumId);
  }

  public deleteAlbumFromFavs(albumId: string) {
    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== albumId,
    );
  }

  public addTrackToFavs(trackId: string) {
    validateCollectionEntity(
      this.trackService.getAllTracks(),
      trackId,
      'Tracks',
    );

    this.favorites.tracks.push(trackId);

    return getFavsResponseMessage('Track', trackId);
  }

  public deleteTrackFromFavs(trackId: string) {
    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
  }
}
