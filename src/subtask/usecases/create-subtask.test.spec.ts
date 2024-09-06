import { IDGenerator } from "../../user/ports/id-generator.interface";
import { CreateSubtask } from "./create-subtask";
import { InMemorySubtaskRepository } from "../adapters/in-memory-subtask.resposiotry";
import { InMemoryTodoRepository } from "../../todo/adapters/in-memory-todo.repository";
import { FixedIdGenerator } from "../../user/adapters/fixed-id-generator";
import { User } from "../../user/entities/user";
import { Todo } from "../../todo/entities/todo";
import { TodoStatus } from "../../todo/entities/todoStatus";

describe("Feature: create subtask", () => {
    let todoRepository: InMemoryTodoRepository;
    let subtaskRepository: InMemorySubtaskRepository;
    let idGenerator: IDGenerator;
    let useCase: CreateSubtask;

    beforeEach(() => {
        todoRepository = new InMemoryTodoRepository();
        subtaskRepository = new InMemorySubtaskRepository();
        idGenerator = new FixedIdGenerator();
        useCase = new CreateSubtask(
            todoRepository,
            subtaskRepository,
            idGenerator
        );
    });

    const user = new User({
        id: "john-1",
        email: "johndoe@gmail.com",
        password: "password"
    });

    const todo = new Todo({
        id: "to-1",
        userId: user.props.id,
        title: "title",
        description: "description",
        status: TodoStatus.TODO
    });

    const payload = {
        todoId: todo.props.id,
        title: "subtask"
    };

    describe("Scenario: happy path", () => {
        it("subtask should create", async () =>{
            await todoRepository.create(todo);
            const result = await useCase.execute(payload);

            expect(subtaskRepository.database.length).toBe(1);
            expect(result.id).toBe("id-1")
        });
    });

    describe("Scenario: throw error", () => {
        it("todo not found", async () => {
           await expect(useCase.execute(payload)).rejects.toThrow("todo not found")
        })

    })
})