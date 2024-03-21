import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  public async getAllFavs() {
    return {
      artists: await this.prisma.artist.findMany({
        where: { favorite: true },
        select: this.prisma.exclude('Artist', ['favorite']),
      }),
      albums: await this.prisma.album.findMany({
        where: { favorite: true },
        select: this.prisma.exclude('Album', ['favorite']),
      }),
      tracks: await this.prisma.track.findMany({
        where: { favorite: true },
        select: this.prisma.exclude('Track', ['favorite']),
      }),
    };
  }

  public async addArtistToFavs(artistId: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id: artistId },
    });

    if (!artist) {
      this.throwUnprocessableEntityException('Artist', artistId);
    }

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

  public async addAlbumToFavs(albumId: string) {
    const album = await this.prisma.album.findUnique({
      where: { id: albumId },
    });

    if (!album) {
      this.throwUnprocessableEntityException('Album', albumId);
    }

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

  public async addTrackToFavs(trackId: string) {
    const album = await this.prisma.track.findUnique({
      where: { id: trackId },
    });

    if (!album) {
      this.throwUnprocessableEntityException('Track', trackId);
    }

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

  private throwUnprocessableEntityException(
    entityName: string,
    entityId: string,
  ) {
    throw new UnprocessableEntityException(
      `${entityName} ${entityId} is unprocessable`,
    );
  }
}
