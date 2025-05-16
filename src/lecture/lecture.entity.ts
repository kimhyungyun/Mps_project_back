import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { LectureType } from './lecture-type.enum';
import { LectureCategory } from './lecture-category.entity';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('int')
  price: number;

  @Column()
  thumbnailUrl: string;

  @Column()
  videoUrl: string;

  @Column({
    type: 'enum',
    enum: LectureType,
    default: LectureType.SINGLE,
  })
  type: LectureType;

  @ManyToOne(() => LectureCategory, (category) => category.lectures, {
    eager: true,
  })
  category: LectureCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.lectures)
  instructor: User;
}
