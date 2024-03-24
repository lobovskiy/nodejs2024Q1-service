import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  public getAllTracks() {
    return this.prisma.track.findMany();
  }

  public async getTrack(id: string) {
    return await this.getTrackEntity(id);
  }

  public createTrack(dto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = dto;

    return this.prisma.track.create({
      data: { name, artistId, albumId, duration, favorite: false },
    });
  }

  public async updateTrack(id: string, dto: UpdateTrackDto) {
    const { name, artistId, albumId, duration } = dto;

    await this.getTrackEntity(id);

    return this.prisma.track.update({
      where: { id },
      data: { name, artistId, albumId, duration },
    });
  }

  public async deleteTrack(id: string) {
    await this.getTrackEntity(id);
    await this.prisma.track.delete({ where: { id } });
  }

  private async getTrackEntity(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track ${id} not found`);
    }

    return track;
  }
}
