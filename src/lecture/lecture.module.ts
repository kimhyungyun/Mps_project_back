import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { Lecture } from './entity/lecture.entity';


import { User } from '@/user/entity/user.entity';
import { LectureCategory } from './entity/lecture-category.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Lecture, User, LectureCategory])],
  controllers: [LectureController],
  providers: [LectureService],
  exports: [LectureService],
})
export class LectureModule {}
