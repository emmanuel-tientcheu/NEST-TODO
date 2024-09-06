import { ISubtaskRepository } from "../ports/subtask-repository-interface";

export class DeleteSubtask {
    constructor(
        private readonly subtaskRepository: ISubtaskRepository
    ) {}

    async execute(id: string) {
        const subtask = await this.subtaskRepository.findById(id);
        if(subtask === null) throw new Error("subtask not found");

        await this.subtaskRepository.delete(id);
        return {id};
    }
}