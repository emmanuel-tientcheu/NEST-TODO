import { User } from "../entities/user";
import { IUserRepository } from "../ports/user-repository.interface";
import { UserService } from "../services/user.service";
import { User as PrismaUser} from "@prisma/client"



export class POSTGRESQLUserRepository implements IUserRepository{

    constructor(private readonly userService: UserService) {}

    async findAll(): Promise<PrismaUser[]> {
        return await this.userService.findAll()
    }

    async create(user: User): Promise<void> {
       await this.userService.create(user); 
    }

}