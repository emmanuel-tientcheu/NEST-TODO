import { ITodoRepository } from "src/todo/ports/todo-repository-interface";
import { ISubtaskRepository } from "../ports/subtask-repository-interface";
import { IDGenerator } from "../../user/ports/id-generator.interface";
import { Subtask } from "../entities/subtask";

export class CreateSubtask {
    constructor(
        private readonly todoRepository: ITodoRepository,
        private readonly subtaskRepository: ISubtaskRepository,
        private readonly idGenerator: IDGenerator
    ) {}

    async execute(
        data: {
            todoId: string,
            title: string
        }
    ) {
        const todo = await this.todoRepository.findById(data.todoId);
        if (todo === null) throw new Error("todo not found");

        const id = this.idGenerator.generate();
        const subtask = new Subtask({
            id,
            title: data.title,
            todoId: data.todoId
        });

        await this.subtaskRepository.create(subtask);

        return {id};
    }
}