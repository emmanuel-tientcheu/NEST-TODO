import { Injectable } from "@nestjs/common";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { Todo } from "../entities/todo";
import { PrismaService } from "../../core/prima.service";
import { Prisma } from "@prisma/client";
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
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}