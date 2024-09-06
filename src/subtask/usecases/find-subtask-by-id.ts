import { ISubtaskRepository } from "../ports/subtask-repository-interface";

export class FindSubtaskById {
    constructor(
        private readonly subtaskRepository: ISubtaskRepository
    ) {}

    async execute (id: string) {
        const subtask = await this.subtaskRepository.findById(id);
        if(subtask === null) throw new Error("subtask not found");
        
        return subtask;
    }
}