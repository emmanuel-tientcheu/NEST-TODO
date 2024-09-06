import { Prisma, Subtask as PrismaSubtaskCLient} from "@prisma/client";
import { Subtask } from "../entities/subtask";
import { ISubtaskRepository } from "../ports/subtask-repository-interface";

export class InMemorySubtaskRepository implements ISubtaskRepository {
    database: Subtask[] = [];

    async create(subtask: Subtask): Promise<void> {
        this.database.push(subtask)
    }
    async update(id: string, newSubtask: Subtask): Promise<Prisma.SubtaskUpdateInput | null> {
        const subtask = this.database.find(subtask => subtask.props.id === id);

        if(subtask === null) return null;

        subtask.props = {
            ...subtask.props,
            ...newSubtask.props
        }

        return Promise.resolve(subtask.toPrisma());
    }
    async findById(id: string): Promise<PrismaSubtaskCLient | null> {
        const subtask = this.database.find(subtask => subtask.props.id === id);
        
        if (!subtask) {
            return null;
        }

        return {
            id: subtask.props.id,
            title: subtask.props.title,
            todoId: subtask.props.todoId
        }
    }
    
    async delete(id: string): Promise<void> {
        const index = this.database.findIndex(subtask => subtask.props.id == id);
        if(index == -1) throw new Error(`subtask with id ${id} not found`);

        this.database.splice(index, 1);
    }

}