import { IsString, IsNumber, IsEnum, IsUrl } from 'class-validator';
import { LectureType } from '../lecture-type.enum';

export class CreateLectureDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  thumbnailUrl: string;

  @IsUrl()
  videoUrl: string;

  @IsEnum(LectureType)
  type: LectureType;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  instructorId: number;
} 