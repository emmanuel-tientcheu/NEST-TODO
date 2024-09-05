import { InMemoryUserRepository } from "../../user/adapters/in-memory-user.repository";
import { InMemoryTodoRepository } from "../adapters/in-memory-todo.repository";
import { User } from "../../user/entities/user";
import { Todo } from "../entities/todo";
import { TodoStatus } from "../entities/todoStatus";
import { DeleteTodo } from "./delete-todo";

describe("Feature: delete todo", () => {
    let userRepository : InMemoryUserRepository;
    let todoRepository: InMemoryTodoRepository;
    let useCase: DeleteTodo;
    
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        todoRepository = new InMemoryTodoRepository();
        useCase = new DeleteTodo(
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
        expect(todoRepository.database.length).toBe(0);
    });

    it("Scenario; should throw", async () => {
       await expect(useCase.execute("garbage")).rejects.toThrow("Todo not found");

    });
})