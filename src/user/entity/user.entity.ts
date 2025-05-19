import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Lecture } from '@/lecture/entity/lecture.entity';
import { Payment } from '@/payment/entity/payment.entity';
import { Post } from '@/post/entity/post.entity';
import { Comment } from '@/comment/entity/comment.entity';
import { UserRole } from '@/user/enum/user-role.enum';

@Entity()
export class User {
  @Column()
  idNumber: number;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  nickname: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  lastLogin: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Lecture, (lecture) => lecture.instructor)
  lectures: Lecture[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
