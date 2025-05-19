import { IsString, IsNumber, IsEnum, IsUrl } from 'class-validator';
import { LectureType } from '../enum/lecture-type.enum';

export class CreateLectureDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  thumbnail_url: string;

  @IsUrl()
  video_url: string;

  @IsEnum(LectureType)
  type: LectureType;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  instructorId: number;
}
