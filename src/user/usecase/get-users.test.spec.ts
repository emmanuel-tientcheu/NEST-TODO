import { InMemoryUserRepository } from "../adapters/in-memory-user.repository"
import { User } from "../entities/user"
import { GetUsers } from "./get-users"

describe("Feature: Get All User" ,() => {
    it("get all user", async () => {
        const repository = new InMemoryUserRepository()
        const user = new User({
            id: "id-1",
            email: "johndoe@gmail.com",
            password: "password"
        })

        await repository.create(user)
        const useCase = new GetUsers(repository)

        expect(await useCase.execute()).toEqual([user])
    }) 
})