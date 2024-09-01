import { FixedIdGenerator } from "../adapters/fixed-id-generator";
import { InMemoryUserRepository } from "../adapters/in-memory-user.repository";
import { IDGenerator } from "../ports/id-generator.interface";
import { IUserRepository } from "../ports/user-repository.interface";
import { CreateUser } from "./create-user"

describe("Feature create User", () => {

    let repository: IUserRepository;
    let idGenerator: IDGenerator;

    beforeEach(() => {
         repository = new InMemoryUserRepository();
         idGenerator = new FixedIdGenerator()
    })

    describe("Scenario: happy path", () => {
        it("should create user", async () => {
    
            const useCase = new CreateUser(repository, idGenerator);
    
            const payload = {
                email: "johndoe@gmail.com",
                password: "password"
            }
    
            const result = await useCase.execute(payload);
            expect(result.id).toBe("id-1")
        })
    })
   
})