import { Subtask } from "../entities/subtask";
import { ISubtaskRepository } from "../ports/subtask-repository-interface";

export class UpdateSubtask {
    constructor(
        private readonly subtaskRepository: ISubtaskRepository
    ) {}

    async execute(
        id: string,
        data: {
            title: string
        }
    ) {
        const subtask = await this.subtaskRepository.findById(id);
        if(subtask === null) throw new Error("subtask not found");

        const newSubtask = new Subtask({
            id,
            title: data.title,
            todoId: subtask.todoId
        });

        const result = await this.subtaskRepository.update(id, newSubtask);
        return result;
    }
}