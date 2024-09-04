import { IUserRepository } from "../ports/user-repository.interface";

export class FindUserByEmailAddress {
    constructor(private readonly repository: IUserRepository) {}

    async execute(data: {
        email: string
    }) {
        const result =await this.repository.findUserByEmailAddress(data.email);
        if(result === null) throw Error("User not found");

        return result;
        
    }
}