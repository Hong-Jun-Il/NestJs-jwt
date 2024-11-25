import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { PostsModule } from './posts/posts.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, DatabaseModule, MyLoggerModule, PostsModule],
})
export class AppModule {}
