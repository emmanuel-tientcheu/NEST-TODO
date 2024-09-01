import { PrismaService } from "../../core/prima.service";
import { User } from "../entities/user";
import { IUserRepository } from "../ports/user-repository.interface";
import { Injectable } from "@nestjs/common";
import { User as PrismaCLient} from "@prisma/client"


@Injectable()
export class UserService implements IUserRepository {
    constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaCLient[]> {
    const users = await this.prisma.user.findMany(); 
    return users;  //?
  }

   async create(user: User): Promise<void> {
       await this.prisma.user.create({
         data: user.toPrisma()
       })
    }
}