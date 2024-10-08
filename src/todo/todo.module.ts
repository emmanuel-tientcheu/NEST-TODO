import { Module } from '@nestjs/common';
import { RandomIdGenerate } from '../user/adapters/random-id-generate';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';
import { PrismaService } from '../core/prima.service';
import { POSTGRESQLUserRepository } from '../user/adapters/postgre-sql-user.repository';
import { UserService } from '../user/services/user.service';
import { POSTGRESQLTodoRepository } from './adapters/postgre-sql-todo-repository';
import { CreateTodo } from './usecases/create-todo';
import { UpdateTodo } from './usecases/update-todo';
import { FindTodoById } from './usecases/find-to-by-id';
import { DeleteTodo } from './usecases/delete-todo';
import { FindTodoByIdWithSubtasks } from './usecases/find-todo-by-id-with-subtasks';
import { Authenticator } from '../user/services/authenticator';
import { AuthGuard } from '../core/guards/auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { FindAllTodoByUser } from './usecases/find-all-todo-by-user';

@Module({
    controllers: [TodoController],
    providers: [
        RandomIdGenerate,
        TodoService,
        UserService,
        PrismaService,
        {
            provide: POSTGRESQLUserRepository,
            inject: [UserService],
            useFactory: (userService) => {
              return new POSTGRESQLUserRepository(userService)
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
            provide: CreateTodo,
            inject: [POSTGRESQLUserRepository, POSTGRESQLTodoRepository, RandomIdGenerate],
            useFactory: (userRepository, todoRepository, idGenerator) => {
                return new CreateTodo(userRepository, todoRepository, idGenerator);
            }
        },
        {
            provide: UpdateTodo,
            inject: [POSTGRESQLUserRepository, POSTGRESQLTodoRepository],
            useFactory: (userRepository, todoRepository ) => {
                return new UpdateTodo(userRepository, todoRepository);
            }
        },
        {
            provide: FindTodoById,
            inject: [POSTGRESQLTodoRepository],
            useFactory: (todoRepository) => {
                return new FindTodoById(todoRepository);
            }
        },
        {
            provide: DeleteTodo,
            inject: [POSTGRESQLTodoRepository],
            useFactory: (todoRepository) => {
                return new DeleteTodo(todoRepository);
            }
        },
        {
            provide: FindTodoByIdWithSubtasks,
            inject: [POSTGRESQLTodoRepository],
            useFactory: (todoRepository) => {
                return new FindTodoByIdWithSubtasks(todoRepository);
            }
        },
        {
            provide: FindAllTodoByUser,
            inject: [POSTGRESQLTodoRepository],
            useFactory: (todoRepository) => {
                return new FindAllTodoByUser(todoRepository);
            }
        },
        {
            provide: Authenticator,
            inject: [POSTGRESQLUserRepository],
            useFactory: (repository) => {
              return new Authenticator(repository)
            }
        },
        {
            provide: APP_GUARD,
            inject: [Authenticator],
            useFactory: (authenticator) => {
                return new AuthGuard(authenticator)
            }
        }
    ]
})
export class TodoModule {}
