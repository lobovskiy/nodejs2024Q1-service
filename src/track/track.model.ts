import { randomUUID } from 'crypto';

export const DTO_ARTIST_ID_FIELD = 'artistId';
export const DTO_ALBUM_ID_FIELD = 'albumId';

export class TrackEntity {
  id: string;
  name: string;
  [DTO_ARTIST_ID_FIELD]: string | null;
  [DTO_ALBUM_ID_FIELD]: string | null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    this.id = randomUUID();
    this.name = partial.name;
    this[DTO_ARTIST_ID_FIELD] = partial[DTO_ARTIST_ID_FIELD] || null;
    this[DTO_ALBUM_ID_FIELD] = partial[DTO_ALBUM_ID_FIELD] || null;
    this.duration = partial.duration;
  }
}
