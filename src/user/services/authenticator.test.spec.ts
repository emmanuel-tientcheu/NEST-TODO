import { InMemoryUserRepository } from "../adapters/in-memory-user.repository"
import { User } from "../entities/user"
import { Authenticator } from "./authenticator"

describe("Authenticator", () => {
   let repository: InMemoryUserRepository
   let authenticator: Authenticator

   beforeEach(async () => {
    repository = new InMemoryUserRepository()
    authenticator = new Authenticator(repository)
    
    await repository.create(new User({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "azerty"
    }));
   })

    describe("can token is valid", () => {
        it("should authenticate user", async () => {
        
            const payload = Buffer.from("johndoe@gmail.com:azerty").toString("base64");
    
            const user = await authenticator.authenticate(payload);
    
            expect(user).toEqual({
                id: "id-1",
                email: "johndoe@gmail.com",
                password: "azerty"
            });
        })
    })

    describe("Can token is not valid", () => {
        it("it should faild if user not valid", async () => {
    
            const payload = Buffer.from("unknow@gmail.com:azerty").toString("base64");
        
            expect(() => authenticator.authenticate(payload)).rejects.toThrow("user not found");
        })
    })

    it("test", () => {
        console.log(Buffer.from("johndoe@gmail.com:azerty").toString("base64"))
    })
})  