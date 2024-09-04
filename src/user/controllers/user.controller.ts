import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateUser } from "../usecase/create-user";
import { UserApi } from "../contract";
import { ZodevalidationPipe } from "../pipes/zode-validation.pipe";
import { GetUsers } from "../usecase/get-users";
import { User } from "../entities/user";
import { User as PrismaUser} from "@prisma/client"
import { FindUserByEmailAddress } from "../usecase/find-user-by-email-address";


@Controller()
export class UserController {
    constructor(
        private readonly createUser: CreateUser,
        private readonly getUsers: GetUsers,
        private readonly findUserByEmailAddress: FindUserByEmailAddress
    ) {}

    @Post('/create-user')
    handleCreateUser(
        @Body(new ZodevalidationPipe(UserApi.CreateUser.schema)) body: UserApi.CreateUser.Request
    ): Promise<UserApi.CreateUser.Response> {
        
       return this.createUser.execute({
            email: body.email,
            password: body.password
        })
    }

   @Get('/get-users')
   async handleGetUsers(): Promise<PrismaUser[]> {
        return await this.getUsers.execute()
    }

   @Get('/user/:email')
   async handleFindUserByEmailAddress(@Param('email') email: string) {
        return this.findUserByEmailAddress.execute({email})
   }
}