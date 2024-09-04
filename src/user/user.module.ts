import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { InMemoryUserRepository } from './adapters/in-memory-user.repository';
import { CreateUser } from './usecase/create-user';
import { RandomIdGenerate } from './adapters/random-id-generate';
import { UserService } from './services/user.service';
import { PrismaService } from '../core/prima.service';
import { POSTGRESQLUserRepository } from './adapters/postgre-sql-user.repository';
import { GetUsers } from './usecase/get-users';
import { FindUserByEmailAddress } from './usecase/find-user-by-email-address';

@Module({
  controllers: [UserController],
  providers: [
    RandomIdGenerate,
    // InMemoryUserRepository, => for e2eTest
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
      provide: CreateUser,
      inject: [POSTGRESQLUserRepository, RandomIdGenerate],
      useFactory: (repository, idGenerator) => {
        return new CreateUser(repository, idGenerator)
      }
    },
    {
      provide: GetUsers,
      inject: [POSTGRESQLUserRepository],
      useFactory: (repository) => {
        return new GetUsers(repository)
      }
    },
    {
      provide: FindUserByEmailAddress,
      inject: [POSTGRESQLUserRepository],
      useFactory: (repository) => {
        return new FindUserByEmailAddress(repository)
      }
    }
  ]

})
export class UserModule {}
