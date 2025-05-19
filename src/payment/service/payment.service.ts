import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entity/payment.entity';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UpdatePaymentDto } from '../dto/update-payment.dto';

import { Lecture } from '@/lecture/entity/lecture.entity';
import { PaymentStatus } from '../enum/payment-status.enum';
import { User } from '@/user/entity/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const user = await this.userRepository.findOne({
      where: { idNumber: createPaymentDto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const lecture = await this.lectureRepository.findOne({
      where: { id: createPaymentDto.lectureId },
    });
    if (!lecture) {
      throw new NotFoundException(`Lecture not found`);
    }

    const { userId, lectureId, ...paymentData } = createPaymentDto;
    const payment = this.paymentRepository.create({
      ...paymentData,
      user,
      lecture,
      paymentStatus: PaymentStatus.PENDING,
    });
    return await this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ['user', 'lecture'],
    });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['user', 'lecture'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment not found`);
    }
    return payment;
  }

  async update(
    id: number,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.findOne(id);
    const { userId, lectureId, ...updateData } =
      updatePaymentDto as CreatePaymentDto;

    if (userId) {
      const user = await this.userRepository.findOne({
        where: { idNumber: userId },
      });
      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      payment.user = user;
    }

    if (lectureId) {
      const lecture = await this.lectureRepository.findOne({
        where: { id: lectureId },
      });
      if (!lecture) {
        throw new NotFoundException(`Lecture not found`);
      }
      payment.lecture = lecture;
    }

    Object.assign(payment, updateData);
    return await this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }
}
