import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './lecture.entity';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { User } from '../user/user.entity';
import { LectureCategory } from './lecture-category.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(LectureCategory)
    private categoryRepository: Repository<LectureCategory>,
  ) {}

  async create(createLectureDto: CreateLectureDto): Promise<Lecture> {
    const instructor = await this.userRepository.findOne({
      where: { idNumber: createLectureDto.instructorId },
    });
    if (!instructor) {
      throw new NotFoundException(`Instructor not found`);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: createLectureDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category not found`);
    }

    const lecture = this.lectureRepository.create({
      ...createLectureDto,
      instructor,
      category,
    });
    return await this.lectureRepository.save(lecture);
  }

  async findAll(): Promise<Lecture[]> {
    return await this.lectureRepository.find({
      relations: ['instructor', 'category'],
    });
  }

  async findOne(id: number): Promise<Lecture> {
    const lecture = await this.lectureRepository.findOne({
      where: { id },
      relations: ['instructor', 'category'],
    });
    if (!lecture) {
      throw new NotFoundException(`Lecture not found`);
    }
    return lecture;
  }

  async update(id: number, updateLectureDto: UpdateLectureDto): Promise<Lecture> {
    const lecture = await this.findOne(id);

    if (updateLectureDto.instructorId) {
      const instructor = await this.userRepository.findOne({
        where: { idNumber: updateLectureDto.instructorId },
      });
      if (!instructor) {
        throw new NotFoundException(`Instructor not found`);
      }
      lecture.instructor = instructor;
    }

    if (updateLectureDto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateLectureDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category not found`);
      }
      lecture.category = category;
    }

    Object.assign(lecture, updateLectureDto);
    return await this.lectureRepository.save(lecture);
  }

  async remove(id: number): Promise<void> {
    const lecture = await this.findOne(id);
    await this.lectureRepository.remove(lecture);
  }
} 