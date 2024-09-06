import { User } from "../entities/user";
import { User as PrismaCLient} from "@prisma/client"
import { IUserRepository } from "../ports/user-repository.interface";

export interface IAuthenticator {
    authenticate(token: String): Promise<PrismaCLient>
}


export class Authenticator implements IAuthenticator {
    constructor(private readonly repository: IUserRepository) {}

    async authenticate(token: String): Promise<PrismaCLient> {
        const decode =  Buffer.from(token, "base64").toString("utf-8");
        const [emailAddress, password] = decode.split(':');
        console.log(emailAddress)

        const user = await this.repository.findUserByEmailAddress(emailAddress)

        if(user == null) {
            throw new Error('user not found')
        }

        return user
    }
}