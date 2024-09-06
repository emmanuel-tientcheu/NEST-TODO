import { User } from "../entities/user";
import { IDGenerator } from "../ports/id-generator.interface";
import { IUserRepository } from "../ports/user-repository.interface";



export class CreateUser {
    constructor(
        private readonly repository: IUserRepository,
        private readonly idGenerator: IDGenerator
    ) {}

    async execute(data: {
        email: string,
        password: string
    }) {

        const id = this.idGenerator.generate();
        const user = new User({
            id,
            email: data.email,
            password: data.password
        })

        await this.repository.create(user);
        const token = Buffer.from(`${user.props.email}:${user.props.password}`).toString("base64");
        
        return { id , token };
    }
}