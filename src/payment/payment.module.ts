import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './payment.entity';
import { User } from '../user/user.entity';
import { Lecture } from '../lecture/lecture.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Lecture])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {} 