import { IsNumber, IsEnum } from 'class-validator';
import { PaymentMethod } from '../enum/payment-method.enum';

export class CreatePaymentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  lectureId: number;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
