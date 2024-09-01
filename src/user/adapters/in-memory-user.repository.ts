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
}