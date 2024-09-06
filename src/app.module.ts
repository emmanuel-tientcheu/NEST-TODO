import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { SubtaskModule } from './subtask/subtask.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './core/error/custom-exception.filter';

@Module({
  imports: [
    UserModule,
    TodoModule,
    SubtaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
