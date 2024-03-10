import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DTO_ALBUM_ID_FIELD,
  DTO_ARTIST_ID_FIELD,
  TrackEntity,
} from './track.model';
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

  private getTrackIndexByTrackId(id: string) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex < 0) {
      throw new NotFoundException(`Track ${id} not found`);
    }

    return trackIndex;
  }
}
