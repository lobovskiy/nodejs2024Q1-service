import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  artistId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  albumId: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
