import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  public getAllFavs() {
    return {
      artists: this.prisma.artist.findMany({ select: { favorite: true } }),
      albums: this.prisma.album.findMany({ select: { favorite: true } }),
      tracks: this.prisma.track.findMany({ select: { favorite: true } }),
    };
  }

  public addArtistToFavs(artistId: string) {
    return this.prisma.artist.update({
      where: { id: artistId },
      data: { favorite: true },
    });
  }

  public deleteArtistFromFavs(artistId: string) {
    return this.prisma.artist.update({
      where: { id: artistId },
      data: { favorite: false },
    });
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
