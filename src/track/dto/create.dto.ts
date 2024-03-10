import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { DTO_ALBUM_ID_FIELD, DTO_ARTIST_ID_FIELD } from '../track.model';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  [DTO_ARTIST_ID_FIELD]: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  [DTO_ALBUM_ID_FIELD]: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
