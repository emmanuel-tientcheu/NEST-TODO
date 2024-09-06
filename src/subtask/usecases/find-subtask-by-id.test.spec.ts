import { User } from "../../user/entities/user";
import { InMemorySubtaskRepository } from "../adapters/in-memory-subtask.resposiotry"
import { Subtask } from "../entities/subtask";
import { FindSubtaskById } from "./find-subtask-by-id";
import { Todo } from "../../todo/entities/todo";
import { TodoStatus } from "../../todo/entities/todoStatus";

describe("Feature: find by id subtask", () => {
    let subtaskRepository: InMemorySubtaskRepository;
    let useCase: FindSubtaskById;

    beforeEach(() => {
        subtaskRepository = new InMemorySubtaskRepository();
        useCase = new FindSubtaskById(subtaskRepository);
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

    const subtask = new Subtask({
        id: "id-1",
        title: "title",
        todoId: todo.props.id
    });


    describe("Scenario: happy path", () => {
        it("should fetch subtask", async () => {
            await subtaskRepository.create(subtask);
            const response = await useCase.execute(subtask.props.id);

            expect(response.id).toBe(subtask.props.id);
            expect(response.title).toBe(subtask.props.title);
        });
    });

    describe("Scenario: should throw error", () => {
        it("subtask not found", async ()=> {
            await expect(useCase.execute(subtask.props.id)).rejects.toThrow("subtask not found")
        });
    });
})