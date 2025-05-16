import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LectureModule } from './lecture/lecture.module';
import { PaymentModule } from './payment/payment.module';
import { PostModule } from './post/post.module';
import typeOrmConfig from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    LectureModule,
    PaymentModule,
    PostModule,
  ],
})
export class AppModule {}
