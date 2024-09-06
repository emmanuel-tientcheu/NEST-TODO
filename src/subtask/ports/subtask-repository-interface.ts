import { Prisma } from "@prisma/client";
import { Subtask } from "../entities/subtask";
import { Subtask as PrismaSubtaskCLient} from "@prisma/client";

export interface ISubtaskRepository {
    create(subtask: Subtask): Promise<void>; 
    update(id: string, newSubtask: Subtask): Promise<Prisma.SubtaskUpdateInput | null>;
    findById(id: string): Promise<PrismaSubtaskCLient | null>;
    delete(id: string): Promise<void>;
}