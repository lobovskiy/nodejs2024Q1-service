import { randomUUID } from 'crypto';

export const DTO_ARTIST_ID_FIELD = 'artistId';

export class AlbumEntity {
  id: string;
  name: string;
  year: number;
  [DTO_ARTIST_ID_FIELD]: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    this.id = randomUUID();
    this.name = partial.name;
    this.year = partial.year;
    this[DTO_ARTIST_ID_FIELD] = partial[DTO_ARTIST_ID_FIELD] || null;
  }
}
