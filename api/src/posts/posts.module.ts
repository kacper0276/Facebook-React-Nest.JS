import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/dtos/posts.entity';
import { Users } from 'src/dtos/users.entity';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts, Users])],
  providers: [PostsService],
  controllers: [PostsController],
})
export default class PostsModule {}
