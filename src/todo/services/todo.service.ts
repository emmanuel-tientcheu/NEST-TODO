import { Injectable } from "@nestjs/common";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { Todo } from "../entities/todo";
import { PrismaService } from "../../core/prima.service";
import { Prisma, Subtask } from "@prisma/client";
import { Todo as PrismaTodoCLient} from "@prisma/client"


@Injectable()
export class TodoService implements ITodoRepository {
    constructor(private prisma: PrismaService) {}

    async create(todo: Todo): Promise<void> {
        await this.prisma.todo.create({
            data: todo.toPrisma()
        })
    }
    
    async update(id: string, newTodo: Todo): Promise<Prisma.TodoUpdateInput | null> {
        return await this.prisma.todo.update({
            where: {id},
            data: {
                title: newTodo.props.title,
                description: newTodo.props.description,
                status: newTodo.mapStatus(newTodo.props.status),
            }
        });

    }

    async findById(id: string): Promise<PrismaTodoCLient | null> {
        return await this.prisma.todo.findUnique({
            where: {id}
        })
    }

    async findByIdWithSubtasks(id: string): Promise<(PrismaTodoCLient & { subtasks: Subtask[]; }) | null> {
        return await this.prisma.todo.findUnique({
            where: { id },
            include: { subtasks: true },
          });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.todo.delete({
            where: {id}
        });
    }

    async findAllTodoByUser(userId: string): Promise<PrismaTodoCLient[] | null> {
        return this.prisma.todo.findMany({
            where: {
              userId: userId,  // Filtre par l'utilisateur
            },
          });
    }
    
}