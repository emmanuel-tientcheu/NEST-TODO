import { InMemoryUserRepository } from "../../user/adapters/in-memory-user.repository"
import { InMemoryTodoRepository } from "../adapters/in-memory-todo.repository";
import { User } from "../../user/entities/user";
import { Todo } from "../entities/todo";
import { TodoStatus } from "../entities/todoStatus";
import { UpdateTodo } from "./update-todo";

describe("Feature: update todo", () => {
    let userRepository: InMemoryUserRepository;
    let todoRepository: InMemoryTodoRepository;
    let useCase: UpdateTodo;
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        todoRepository = new InMemoryTodoRepository();
        useCase = new UpdateTodo(userRepository, todoRepository);
    });

    const user = new User({
        id: "john-1",
        email: "johndoe@gmail.com",
        password: "password"
    });

    const todo = new Todo({
        id: "id-1",
        userId: user.props.id,
        title: "title",
        description: "description",
        status: TodoStatus.TODO
    });


    describe("Scenario: happy path", () => {
        it("should update todo", async () => {
            await userRepository.create(user);
    
            await todoRepository.create(todo)
    
            const payload = {
                userId : user.props.id,
                title: "new title",
                description: "new description",
                status: "doing"
            };
    
    
           const response = await useCase.execute(todo.props.id, payload);
           
            expect(response.title).toBe(payload.title)
           
    
        });
    });

    describe("Scenario: should throw error", () => {
        it("user not found", async() => {
            await todoRepository.create(todo)
    
            const payload = {
                userId : user.props.id,
                title: "new title",
                description: "new description",
                status: "doing"
            };

            await expect(useCase.execute(todo.props.id, payload)).rejects.toThrow('User not found')
        });

        it("user does not authorize", async() => {
            await userRepository.create(user);
            await todoRepository.create(todo);

            const newUser = new User({
                id: "john-2",
                email: "johndoe2@gmail.com",
                password: "password"
            });

            await userRepository.create(newUser);
    
            const payload = {
                userId : newUser.props.id,
                title: "new title",
                description: "new description",
                status: "doing"
            };

            await expect(useCase.execute(todo.props.id, payload)).rejects.toThrow('this user is not authorize to perform this action')
        })
    })
})