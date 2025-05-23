import { IsString, IsEnum, IsNumber } from 'class-validator';
import { PostCategory } from '../enum/post-category.enum';

export class CreatePostDto {
  @IsNumber()
  userId: number;

  @IsEnum(PostCategory)
  category: PostCategory;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
