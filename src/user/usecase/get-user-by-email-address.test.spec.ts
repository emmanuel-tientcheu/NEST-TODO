import { string } from "zod";
import { InMemoryUserRepository } from "../adapters/in-memory-user.repository"
import { FindUserByEmailAddress } from "./find-user-by-email-address";
import { User } from "../entities/user";


describe("Feature: get user by email address", () => {
    let repository: InMemoryUserRepository;
    let useCase: FindUserByEmailAddress;

    const payload = {
        email: "johndoe@gmail.com"
     };

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        useCase = new FindUserByEmailAddress(repository)
    });

    it("Scenario: user not exist", async () => {


     const result = await useCase.execute(payload);
     expect(result).toEqual(null);
    });

    it("Scenario: should get user", async () => {
        const user = new User({
            id: "id-1",
            email: "johndoe@gmail.com",
            password: "password"
        });

        repository.create(user);
        const result = await useCase.execute(payload);

        expect(result).toEqual(user);

    })
})