import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import PostsService from './posts.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

const storage = {
  storage: diskStorage({
    destination: '../frontend/public/uploadsImgPosts',
    filename: function (req, file, cb) {
      const name = Date.now() + Math.floor(Math.random() * 100) + '.jpg';

      cb(null, name);
    },
  }),
};

@Controller('posts')
export default class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/addposts')
  @UseInterceptors(FileInterceptor('img', storage))
  async addPost(@UploadedFile() file, @Body() dataPost) {
    return await this.postsService.addPosts(file, dataPost);
  }

  @Get('/getposts')
  async getPostsFunction() {
    return await this.postsService.getPosts();
  }

  @Post('/likepost/:username/:id')
  async likePostFunction(@Param('username') username, @Param('id') id) {
    return await this.postsService.likePost(username, id);
  }

  @Get('/getuserspost/:username')
  async getUserPostsFunction(@Param('username') username) {
    return await this.postsService.getUserPosts(username);
  }

  @Get('/deletepost/:idpost')
  async deletePostFunction(@Param('idpost') idpost) {
    return await this.postsService.deletePost(idpost);
  }

  @Post('/editpost')
  @UseInterceptors(FileInterceptor('img', storage))
  async editPostFunction(@UploadedFile() file, @Body() formData) {
    return await this.postsService.editPost(file, formData);
  }

  @Get('/postsinprofile/:username')
  async getPostsInProfileFunction(@Param('username') username: string) {
    return await this.postsService.getPostsInProfile(username);
  }
}
