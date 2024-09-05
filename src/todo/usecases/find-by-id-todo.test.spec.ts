import { InMemoryUserRepository } from "../../user/adapters/in-memory-user.repository";
import { InMemoryTodoRepository } from "../adapters/in-memory-todo.repository";
import { FindTodoById } from "./find-to-by-id";
import { User } from "../../user/entities/user";
import { Todo } from "../entities/todo";
import { TodoStatus } from "../entities/todoStatus";

describe("Feature: find todo by id", () => {
    let userRepository : InMemoryUserRepository;
    let todoRepository: InMemoryTodoRepository;
    let useCase: FindTodoById;
    
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        todoRepository = new InMemoryTodoRepository();
        useCase = new FindTodoById(
            // userRepository,
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

        const result = await useCase.execute(todo.props.id);
        expect(result.id).toBe(todo.props.id);
        expect(result.title).toBe(todo.props.title);
    });

    it("Scenario; should throw", async () => {
       await expect(useCase.execute("garbage")).rejects.toThrow("Todo not found");

    });
})