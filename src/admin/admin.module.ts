import { Module } from '@nestjs/common';
const AdminJSModule = require('@adminjs/nestjs').AdminModule;
const AdminJS = require('adminjs');
const AdminTypeorm = require('@adminjs/typeorm');
const { Database, Resource } = AdminTypeorm;

import { User } from '@/user/entity/user.entity';
import { Post } from '@/post/entity/post.entity';
import { Lecture } from '@/lecture/entity/lecture.entity';
import { Payment } from '@/payment/entity/payment.entity';
import { Comment } from '@/comment/entity/comment.entity';
import { LectureCategory } from '@/lecture/entity/lecture-category.entity';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    AdminJSModule.createAdmin({
      adminJsOptions: {
        rootPath: '/admin',
        resources: [
          {
            resource: User,
            options: {
              navigation: {
                name: '사용자 관리',
                icon: 'User',
              },
              properties: {
                password: {
                  isVisible: {
                    list: false,
                    edit: true,
                    filter: false,
                    show: false,
                  },
                },
              },
            },
          },
          {
            resource: Post,
            options: {
              navigation: {
                name: '게시판 관리',
                icon: 'FileText',
              },
            },
          },
          {
            resource: Lecture,
            options: {
              navigation: {
                name: '강의 관리',
                icon: 'Book',
              },
            },
          },
          {
            resource: Payment,
            options: {
              navigation: {
                name: '결제 관리',
                icon: 'CreditCard',
              },
            },
          },
          {
            resource: Comment,
            options: {
              navigation: {
                name: '댓글 관리',
                icon: 'MessageSquare',
              },
            },
          },
          {
            resource: LectureCategory,
            options: {
              navigation: {
                name: '강의 카테고리',
                icon: 'List',
              },
            },
          },
        ],
        branding: {
          companyName: 'MPS Admin',
          logo: false,
          favicon: '/favicon.ico',
        },
        locale: {
          language: 'ko',
          translations: {
            labels: {
              User: '사용자',
              Post: '게시글',
              Lecture: '강의',
              Payment: '결제',
              Comment: '댓글',
              LectureCategory: '강의 카테고리',
            },
          },
        },
      },
      auth: {
        authenticate: async (email, password) => {
          if (email === 'admin@example.com' && password === 'password') {
            return Promise.resolve({ email: 'admin@example.com' });
          }
          return null;
        },
        cookieName: 'adminjs',
        cookiePassword: 'supersecret',
      },
    }),
  ],
})
export class AdminPanelModule {}
