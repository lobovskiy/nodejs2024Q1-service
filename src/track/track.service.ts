import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackEntity } from './track.model';
import { CreateTrackDto } from './dto/create.dto';
import { UpdateTrackDto } from './dto/update.dto';
import { validateUuid } from '../app.utils';

@Injectable()
export class TrackService {
  private tracks: TrackEntity[] = [];

  public getAllTracks() {
    return this.tracks;
  }

  public getTrack(id: string) {
    const index = this.getTrackIndexByTrackId(id);

    return this.tracks[index];
  }

  public createTrack(dto: CreateTrackDto) {
    const track = new TrackEntity(dto);

    this.tracks.push(track);

    return track;
  }

  public updateTrack(id: string, dto: UpdateTrackDto) {
    const index = this.getTrackIndexByTrackId(id);
    const DTO_UUID_KEYS = ['artistId', 'albumId'];

    Object.keys(dto).forEach((key) => {
      if (DTO_UUID_KEYS.includes(key)) {
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

  private getTrackIndexByTrackId(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex < 0) {
      throw new NotFoundException(`Track ${id} not found`);
    }

    return trackIndex;
  }
}
