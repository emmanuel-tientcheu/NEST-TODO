import { Injectable } from "@nestjs/common";
import { ISubtaskRepository } from "../ports/subtask-repository-interface";
import { Prisma, Subtask as PrismaSubtaskCLient} from "@prisma/client";
import { Subtask } from "../entities/subtask";
import { PrismaService } from "src/core/prima.service";

@Injectable()
export class SubtaskService implements ISubtaskRepository {
    constructor(private prisma: PrismaService) {}

    async create(subtask: Subtask): Promise<void> {
        await this.prisma.subtask.create({
            data: subtask.toPrisma()
        });
    }

    async update(id: string, newSubtask: Subtask): Promise<Prisma.SubtaskUpdateInput | null> {
        return await this.prisma.subtask.update({
            where: {id},
            data: {
                title: newSubtask.props.title
            }
        });
    }
    async findById(id: string): Promise<PrismaSubtaskCLient | null> {
        return await this.prisma.subtask.findUnique({
            where: {id}
        });
    }

    async delete(id: string): Promise<void> {
       await this.prisma.subtask.delete({
           where: {id}
       });
    }
}