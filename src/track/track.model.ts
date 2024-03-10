import { randomUUID } from 'crypto';

export class TrackEntity {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    this.id = randomUUID();
    this.name = partial.name;
    this.artistId = partial.artistId || null;
    this.albumId = partial.albumId || null;
    this.duration = partial.duration;
  }
}
