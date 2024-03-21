import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateArtistDto } from './dto/create.dto';
import { UpdateArtistDto } from './dto/update.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  public getAllArtists() {
    return this.prisma.artist.findMany();
  }

  public async getArtist(id: string) {
    return await this.getArtistEntity(id);
  }

  public createArtist(dto: CreateArtistDto) {
    const { name, grammy } = dto;

    return this.prisma.artist.create({
      data: { name, grammy, favorite: false },
    });
  }

  public async updateArtist(id: string, dto: UpdateArtistDto) {
    const { name, grammy } = dto;

    await this.getArtistEntity(id);

    return this.prisma.artist.update({
      where: { id },
      data: { name, grammy },
    });
  }

  public async deleteArtist(id: string) {
    await this.getArtistEntity(id);
    await this.prisma.artist.delete({ where: { id } });
  }

  private async getArtistEntity(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist ${id} not found`);
    }

    return artist;
  }
}
