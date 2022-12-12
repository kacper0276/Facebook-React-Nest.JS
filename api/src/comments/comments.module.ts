import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comments from 'src/dtos/comments.entity';
import CommentsController from './comments.controller';
import CommentsService from './comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  providers: [CommentsService],
  controllers: [CommentsController],
})
export default class CommentsModule {}
