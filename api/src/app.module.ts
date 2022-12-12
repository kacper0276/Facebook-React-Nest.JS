import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import CommentsModule from './comments/comments.module';
import Comments from './dtos/comments.entity';
import { Posts } from './dtos/posts.entity';
import { Users } from './dtos/users.entity';
import PostsModule from './posts/posts.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'postapp',
      entities: [Users, Posts, Comments],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
