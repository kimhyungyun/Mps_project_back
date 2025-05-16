import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Lecture } from 'src/lecture/lecture.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Lecture)
  lecture: Lecture;

  @Column({ type: 'float', default: 0 })
  progress: number; // 수강률 (%)

  @CreateDateColumn()
  enrolledAt: Date;
}
