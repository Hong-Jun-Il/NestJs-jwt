import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

@Injectable()
export class PostsService {
  private posts = Array.from({ length: 95 }, (_, i) => ({
    id: i + 1,
    title: `title ${i + 1}`,
    img: faker.image.url(),
    content: `content ${i + 1} content ${i + 1} content ${i + 1} content ${i + 1} content ${i + 1}`,
  }));

  getPosts(page: number) {
    try {
      if (page === 1) {
        return this.posts.slice(0, 16);
      }
      const start = page * 8;
      const end = start + 8;

      const data = this.posts.slice(start, end);
      return data;
    } catch (error) {
      console.error(error);
      throw new Error('get posts 에러');
    }
  }
}
