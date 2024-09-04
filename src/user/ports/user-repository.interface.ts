import { User as PrismaCLient} from "@prisma/client"
import { User } from "../entities/user";


export interface IUserRepository {
    create(user: User): Promise<void>
    findAll(): Promise<PrismaCLient[]>
    findUserByEmailAddress(email: string): Promise<PrismaCLient | null >;
}