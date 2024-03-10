import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {}
