import { Module } from '@nestjs/common';
import { RandomIdGenerate } from '../user/adapters/random-id-generate';
import { SubtaskService } from './services/subtask.service';
import { PrismaService } from '../core/prima.service';
import { POSTGRESQLSubtaskRepository } from './adapters/postgre-sql-subtask.repository';
import { CreateSubtask } from './usecases/create-subtask';
import { POSTGRESQLTodoRepository } from 'src/todo/adapters/postgre-sql-todo-repository';
import { TodoService } from '../todo/services/todo.service';
import { FindSubtaskById } from './usecases/find-subtask-by-id';
import { SubTaskController } from './controller/subtask.controller';
import { UpdateSubtask } from './usecases/update-subtask';
import { DeleteSubtask } from './usecases/delete-subtask';

@Module({
    controllers: [SubTaskController],
    providers: [
        RandomIdGenerate,
        SubtaskService,
        TodoService,
        PrismaService,
        {
            provide: POSTGRESQLSubtaskRepository,
            inject: [SubtaskService],
            useFactory: (subtaskService) => {
                return new POSTGRESQLSubtaskRepository(subtaskService)
            }
        },
        {
            provide: POSTGRESQLTodoRepository,
            inject: [TodoService],
            useFactory: (todoService) => {
              return new POSTGRESQLTodoRepository(todoService)
            }
        },
        {
          provide: CreateSubtask,
          inject: [POSTGRESQLTodoRepository, POSTGRESQLSubtaskRepository, RandomIdGenerate],
          useFactory: (todoRepository, subtaskRepository, idGenerator) => {
            return new CreateSubtask(todoRepository, subtaskRepository, idGenerator);
          }  
        },
        {
          provide: FindSubtaskById,
          inject: [POSTGRESQLSubtaskRepository],
          useFactory: (subtaskRepository) => {
            return new FindSubtaskById(subtaskRepository);
          }
        },
        {
          provide: UpdateSubtask,
          inject: [POSTGRESQLSubtaskRepository],
          useFactory: (subtaskRepository) => {
            return new UpdateSubtask(subtaskRepository);
          }
        },
        {
          provide: DeleteSubtask,
          inject: [POSTGRESQLSubtaskRepository],
          useFactory: (subtaskRepository) => {
            return new DeleteSubtask(subtaskRepository);
          }
        }
    ],
})
export class SubtaskModule {}
