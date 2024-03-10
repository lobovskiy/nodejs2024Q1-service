import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {}
