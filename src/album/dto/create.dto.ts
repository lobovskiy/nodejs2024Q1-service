import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DTO_ARTIST_ID_FIELD } from '../album.model';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  [DTO_ARTIST_ID_FIELD]: string;
}
