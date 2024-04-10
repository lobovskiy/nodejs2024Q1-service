import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAlbumDto } from './dto/create.dto';
import { UpdateAlbumDto } from './dto/update.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  public getAllAlbums() {
    return this.prisma.album.findMany();
  }

  public async getAlbum(id: string) {
    return await this.getAlbumEntity(id);
  }

  public createAlbum(dto: CreateAlbumDto) {
    const { name, year, artistId } = dto;

    return this.prisma.album.create({
      data: { name, year, artistId, favorite: false },
    });
  }

  public async updateAlbum(id: string, dto: UpdateAlbumDto) {
    const { name, year, artistId } = dto;

    await this.getAlbumEntity(id);

    return this.prisma.album.update({
      where: { id },
      data: { name, year, artistId },
    });
  }

  public async deleteAlbum(id: string) {
    await this.getAlbumEntity(id);
    await this.prisma.album.delete({ where: { id } });
  }

  private async getAlbumEntity(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(`Album ${id} not found`);
    }

    return album;
  }
}
