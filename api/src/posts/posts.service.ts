import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/dtos/posts.entity';
import { Users } from 'src/dtos/users.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async addPosts(file, dataPost) {
    const { filename } = file,
      { title } = dataPost,
      { description } = dataPost,
      { author } = dataPost,
      likes = 0,
      comments = 'Brak komentarzy';

    const objectAddToDatabase = {
      author: author,
      title: title,
      img: filename,
      description: description,
      likes: likes,
      comments: comments,
    };

    if (title.length === 0) {
      return { error: 'Tytuł jest wymagany' };
    } else {
      await this.postsRepository.save(objectAddToDatabase);
      return { message: 'Pomyślnie dodano post' };
    }
  }

  async getPosts() {
    const posts = await this.postsRepository.find();

    return { posts: posts };
  }

  async likePost(username, id) {
    const findPost = await this.postsRepository.findBy({
      id: id,
    });
    const userLikePosts = await this.usersRepository.query(
      `SELECT * FROM users WHERE login="${username}" AND likedpost LIKE "%${id}%"`,
    );

    if (userLikePosts.length > 0) {
      // GIVE LIKE AFTER

      // POSTS
      const coutnLikePost = findPost[0].likes - 1;
      this.postsRepository.query(
        `UPDATE posts SET likes=${coutnLikePost} WHERE id=${findPost[0].id}`,
      );

      // USER
      const userPostDontLike = await this.usersRepository.findBy({
        login: username,
      });

      const likedPostId = userPostDontLike[0].likedpost.split(',');

      const idAfterFilter = likedPostId.filter((post) => post != id);

      this.usersRepository.query(
        `UPDATE users SET likedpost="${idAfterFilter}" WHERE login="${username}"`,
      );

      return { message: 'Usunięto polubienie' };
    } else {
      // POSTS
      const coutnLikePost = findPost[0].likes + 1;
      this.postsRepository.query(
        `UPDATE posts SET likes=${coutnLikePost} WHERE id=${findPost[0].id}`,
      );

      // USER
      const userPostDontLike = await this.usersRepository.findBy({
        login: username,
      });
      const likedPostsUser = `${userPostDontLike[0].likedpost},${id}`;

      this.usersRepository.query(
        `UPDATE users SET likedpost="${likedPostsUser}" WHERE login="${username}"`,
      );

      return { message: 'Dodano polubienie' };
    }
  }

  async getUserPosts(username) {
    const userPosts = await this.postsRepository.findBy({
      author: username,
    });

    return { userPosts: userPosts };
  }

  async deletePost(postid) {
    const imgName = await this.postsRepository.findBy({
      id: postid,
    });

    fs.unlinkSync(`../frontend/public/uploadsImgPosts/${imgName[0].img}`);

    this.postsRepository.delete({
      id: postid,
    });

    return { message: 'Usunięto post' };
  }

  async editPost(file, formData) {
    const { title } = formData,
      { filename } = file,
      { author } = formData,
      { description } = formData,
      { idPost } = formData;

    const imgName = await this.postsRepository.findBy({
      id: idPost,
    });

    fs.unlinkSync(`../frontend/public/uploadsImgPosts/${imgName[0].img}`);

    const status = await this.postsRepository.query(
      `UPDATE posts SET author='${author}', title='${title}', img='${filename}', description='${description}' WHERE id=${idPost}`,
    );

    if (status.changedRows == 1) {
      return { message: 'Zmieniono post' };
    } else {
      return { error: 'Wystąpił błąd' };
    }
  }

  async getPostsInProfile(username: string) {
    const userPosts = await this.postsRepository.findBy({
      author: username,
    });

    return { posts: userPosts };
  }
}
