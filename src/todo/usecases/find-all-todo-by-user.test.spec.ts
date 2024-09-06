import { InMemoryUserRepository } from "../../user/adapters/in-memory-user.repository";
import { InMemoryTodoRepository } from "../adapters/in-memory-todo.repository";
import { FindTodoById } from "./find-to-by-id";
import { User } from "../../user/entities/user";
import { Todo } from "../entities/todo";
import { TodoStatus } from "../entities/todoStatus";
import { FetchTodo } from "./find-all-todo-by-user";

describe("Feature: Fetch todo", () => {
    let userRepository : InMemoryUserRepository;
    let todoRepository: InMemoryTodoRepository;
    let useCase: FetchTodo;
    
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        todoRepository = new InMemoryTodoRepository();
        useCase = new FetchTodo(
            todoRepository
        );
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

    it("Scenario: happy path", async () => {
        await userRepository.create(user);
        await todoRepository.create(todo);
        const result = await useCase.execute(todo.props.userId);
       
        expect(todoRepository.database.length).toBe(1);
        expect(result[0]).toEqual({
            id: "id-1",
            userId: user.props.id,
            title: "title",
            description: "description",
            status: TodoStatus.TODO.toUpperCase()
        })
    });

    it("Scenario: not todo find", async () => {
        const result = await useCase.execute(todo.props.userId);
       
        expect(todoRepository.database.length).toBe(0);

    });
})