import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentController } from './payment.controller';
import { Payment } from './entity/payment.entity';

import { Lecture } from '../lecture/entity/lecture.entity';
import { User } from '@/user/entity/user.entity';
import { PaymentService } from './service/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, Lecture])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
