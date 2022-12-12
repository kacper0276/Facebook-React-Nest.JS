import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Comments from 'src/dtos/comments.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class CommentsService {
  constructor(
    @InjectRepository(Comments)
    private commentRepository: Repository<Comments>,
  ) {}

  async getAllComments() {
    const allComments = await this.commentRepository.find();

    return { comments: allComments };
  }

  async addNewComment(newCommentObject) {
    const { user } = newCommentObject.newCommentObject,
      { postid } = newCommentObject.newCommentObject,
      { comment } = newCommentObject.newCommentObject;

    const newObjectAddComment = {
      login: user,
      comment: comment,
      idpost: postid,
    };

    if (comment) {
      this.commentRepository.save(newObjectAddComment);

      return { message: 'Dodano komentarz' };
    } else {
      return { error: 'Treść komentarza nie może być pusta' };
    }
  }

  async getComments(id) {
    const commentsInPost = await this.commentRepository.findBy({
      idpost: id,
    });

    return { commentsInPost: commentsInPost };
  }
}
