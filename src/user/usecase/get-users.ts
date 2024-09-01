import { User } from "../entities/user";
import { IUserRepository } from "../ports/user-repository.interface";

export class GetUsers {
    constructor(private readonly repository: IUserRepository) {}

    async execute() {
        return await this.repository.findAll()
    }
}