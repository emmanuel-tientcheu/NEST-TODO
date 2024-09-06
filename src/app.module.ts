import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { SubtaskModule } from './subtask/subtask.module';

@Module({
  imports: [
    UserModule,
    TodoModule,
    SubtaskModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
   
  ],
})
export class AppModule {}
