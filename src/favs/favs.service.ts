import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { IFavorites } from './favs.model';
import { validateCollectionEntity } from '../app.utils';
import { getFavsResponseMessage } from './favs.utils';
import { PrismaService } from '../database/prisma.service';

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
    private prisma: PrismaService,
  ) {}

  public getAllFavs() {
    return {
      artists: this.artistService.getArtist(this.favorites.artists),
      albums: this.prisma.album.findMany({ select: { favorite: true } }),
      tracks: this.prisma.track.findMany({ select: { favorite: true } }),
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
    return this.prisma.album.update({
      where: { id: albumId },
      data: { favorite: true },
    });
  }

  public deleteAlbumFromFavs(albumId: string) {
    return this.prisma.album.update({
      where: { id: albumId },
      data: { favorite: false },
    });
  }

  public addTrackToFavs(trackId: string) {
    return this.prisma.track.update({
      where: { id: trackId },
      data: { favorite: true },
    });
  }

  public deleteTrackFromFavs(trackId: string) {
    return this.prisma.track.update({
      where: { id: trackId },
      data: { favorite: false },
    });
  }
}
