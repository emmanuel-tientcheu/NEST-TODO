import { Prisma, Subtask as PrismaSubtaskCLient} from "@prisma/client";;
import { Subtask } from "../entities/subtask";
import { ISubtaskRepository } from "../ports/subtask-repository-interface";
import { SubtaskService } from "../services/subtask.service";

export class POSTGRESQLSubtaskRepository implements ISubtaskRepository {
    constructor(private readonly subtaskService: SubtaskService) {}

    async create(subtask: Subtask): Promise<void> {
        return await this.subtaskService.create(subtask);
    }

   async update(id: string, newSubtask: Subtask): Promise<Prisma.SubtaskUpdateInput | null> {
        return await this.subtaskService.update(id, newSubtask);
    }

    async findById(id: string): Promise<PrismaSubtaskCLient | null> {
        return await this.subtaskService.findById(id);
    }

    async delete(id: string): Promise<void> {
        return await this.subtaskService.delete(id);
    }
    
}