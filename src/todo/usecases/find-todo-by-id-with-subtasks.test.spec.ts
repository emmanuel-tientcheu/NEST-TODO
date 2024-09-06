import { InMemoryUserRepository } from "../../user/adapters/in-memory-user.repository";
import { InMemoryTodoRepository } from "../adapters/in-memory-todo.repository";
import { User } from "../../user/entities/user";
import { Todo } from "../entities/todo";
import { TodoStatus } from "../entities/todoStatus";
import { InMemorySubtaskRepository } from "../../subtask/adapters/in-memory-subtask.resposiotry";
import { FindTodoByIdWithSubtasks } from "./find-todo-by-id-with-subtasks";
import { Subtask } from "../../subtask/entities/subtask";

describe("Feature: find todo by id with subtask", () => {
    let userRepository : InMemoryUserRepository;
    let todoRepository: InMemoryTodoRepository;
    let subtaskRepository: InMemorySubtaskRepository;

    let useCase: FindTodoByIdWithSubtasks;
    
    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        todoRepository = new InMemoryTodoRepository();
        subtaskRepository = new InMemorySubtaskRepository();

        useCase = new FindTodoByIdWithSubtasks(
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

    const subtask = new Subtask({
        id: "sub-1",
        title: "first sub",
        todoId: todo.props.id
    });

    it("Scenario: happy path", async () => {
        await userRepository.create(user);
        await todoRepository.create(todo);
        await subtaskRepository.create(subtask)


        const result = await useCase.execute(todo.props.id);
        console.log(result);
        expect(result.id).toBe(todo.props.id);
        expect(result.title).toBe(todo.props.title);
    });

    it("Scenario; should throw", async () => {
       await expect(useCase.execute("garbage")).rejects.toThrow("Todo not found");

    });
})