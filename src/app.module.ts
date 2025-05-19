import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LectureModule } from './lecture/lecture.module';
import { PaymentModule } from './payment/payment.module';
import { PostModule } from './post/post.module';
import typeOrmConfig from './config/typeorm.config';

import { AdminPanelModule } from './admin/admin.module';
import AdminJS from 'adminjs';

const AdminTypeorm = require('@adminjs/typeorm');
const { Database, Resource } = AdminTypeorm;

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminPanelModule,
    UserModule,
    LectureModule,
    PaymentModule,
    PostModule,
  ],
})
export class AppModule {}
