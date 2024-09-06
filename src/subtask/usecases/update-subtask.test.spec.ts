import { User } from "../../user/entities/user";
import { InMemorySubtaskRepository } from "../adapters/in-memory-subtask.resposiotry"
import { Subtask } from "../entities/subtask";
import { Todo } from "../../todo/entities/todo";
import { TodoStatus } from "../../todo/entities/todoStatus";
import { UpdateSubtask } from "./update-subtask";
import { time } from "console";

describe("Feature: update subtask", () => {
    let subtaskRepository: InMemorySubtaskRepository;
    let useCase: UpdateSubtask;

    beforeEach(() => {
        subtaskRepository = new InMemorySubtaskRepository();
        useCase = new UpdateSubtask(subtaskRepository);
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

    const payload = {
        title: "new title"
    }


    describe("Scenario: happy path", () => {
        it("should update subtask", async () => {
            await subtaskRepository.create(subtask);
            const response = await useCase.execute(subtask.props.id, payload);

            expect(response.id).toBe(subtask.props.id);
            expect(response.title).toBe(payload.title);
        });
    });

    describe("Scenario: should throw error", () => {
        it("subtask not found", async ()=> {
            await expect(useCase.execute(subtask.props.id, payload)).rejects.toThrow("subtask not found")
        });
    });
})