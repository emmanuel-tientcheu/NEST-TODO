import { User as PrismaClient } from "@prisma/client";
import { User } from "../entities/user";
import { IUserRepository } from "../ports/user-repository.interface";

export class InMemoryUserRepository implements IUserRepository {
 
    database: User[] = [];

    async create(user: User): Promise<void> {
        this.database.push(user)
    }

    async findAll(): Promise<User[]> {
        return this.database
    }

    async findById(id: string): Promise<PrismaClient | null> {
        const result = this.database.find(user => user.props.id == id) ?? null;
        if(result=== null) return null;

        return result.toPrisma()

    }

    async findUserByEmailAddress(email: string): Promise<User | null> {
        return this.database.find(user => user.props.email == email) ?? null;
            
    }
}