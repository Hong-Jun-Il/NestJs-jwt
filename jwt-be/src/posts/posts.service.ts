import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class PostsService {
  private posts = Array.from({ length: 54 }, (_, i) => ({
    id: i + 1,
    title: `title ${i + 1}`,
    img: faker.image.url(),
    content: `content ${i + 1} content ${i + 1} content ${i + 1} content ${i + 1} content ${i + 1}`,
  }));

  getPosts(page: number) {
    try {
      const start = (page - 1) * 8;
      const end = start + 8;

      const data = this.posts.slice(start, end);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('get posts 에러');
    }
  }
}
