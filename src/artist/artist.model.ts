import { randomUUID } from 'crypto';

export class ArtistEntity {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    this.id = randomUUID();
    this.name = partial.name;
    this.grammy = partial.grammy;
  }
}
