import { InMemoryUserRepository } from "../../user/adapters/in-memory-user.repository"
import { CreateTodo } from "./create-todo"
import { InMemoryTodoRepository } from "../adapters/in-memory-todo.repository";
import { FixedIdGenerator } from "../../user/adapters/fixed-id-generator";
import { Todo } from "../entities/todo";
import { User } from "../../user/entities/user";

describe("Feature: create todo", () => {
    let userRepository : InMemoryUserRepository;
    let todoRepository: InMemoryTodoRepository;
    let fixedIdGenerator: FixedIdGenerator;
    let useCase: CreateTodo;
    
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        todoRepository = new InMemoryTodoRepository();
        fixedIdGenerator = new FixedIdGenerator();
        useCase = new CreateTodo(
            userRepository,
            todoRepository,
            fixedIdGenerator
        );
    });

    const user = new User({
        id: "id-1",
        email: "johndoe@gmail.com",
        password: "password"
    });

    const payload = {
        userId: user.props.id,
        title: "first todo",
        description: "description todo",
        status : "todo"
    }

    describe("Scenario: happy path", () => {
        it("verify number of elements", async () => {
    
            await userRepository.create(user)

            const result = await useCase.execute(payload);
            expect(todoRepository.database.length).toBe(1);
        });

        it("todo should created", async () => {
            await userRepository.create(user);
    
            const result = await useCase.execute(payload);
            expect(result.id).toEqual("id-1");
        });
    });

    describe("Scenario: should throw", () => {
        it("when user don't exist", async () => {
            await expect(() => useCase.execute(payload)).rejects.toThrow("user not found");
        });

        it("when status is wrong", async () => {
            const payload = {
                userId: user.props.id,
                title: "first todo",
                description: "description todo",
                status : "wrong status"
            };

            await userRepository.create(user);

            await expect(() => useCase.execute(payload)).rejects.toThrow(`the value ${payload.status} is not defined`)
        })
    })
    
} )