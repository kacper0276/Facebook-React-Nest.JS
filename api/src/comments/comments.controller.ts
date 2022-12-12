import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CommentsService from './comments.service';

@Controller('comments')
export default class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/allcomments')
  async getAllCommentsFunction() {
    return this.commentsService.getAllComments();
  }

  @Post('/addcomment')
  async addNewFunctionComment(@Body() newCommentObject) {
    return await this.commentsService.addNewComment(newCommentObject);
  }

  @Get('/getcomment/:id')
  async getCommentFunction(@Param('id') id) {
    return await this.commentsService.getComments(id);
  }
}
