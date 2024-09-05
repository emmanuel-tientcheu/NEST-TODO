import { Injectable } from "@nestjs/common";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { Todo } from "../entities/todo";
import { PrismaService } from "../../core/prima.service";

@Injectable()
export class TodoService implements ITodoRepository {
    constructor(private prisma: PrismaService) {}

    async create(todo: Todo): Promise<void> {
        await this.prisma.todo.create({
            data: todo.toPrisma()
        })
    }
    update(id: string, newTodo: Partial<Omit<Todo, "id">>): Promise<Todo> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Todo | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}