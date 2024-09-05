import { Prisma } from "@prisma/client";
import { Todo } from "../entities/todo";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { TodoService } from "../services/todo.service";
import { Todo as PrismaTodoCLient} from "@prisma/client";


export class POSTGRESQLTodoRepository implements ITodoRepository {

    constructor(private readonly todoService: TodoService) {}

    async create(todo: Todo): Promise<void> {
        return await this.todoService.create(todo)
    }

    async update(id: string, newTodo: Todo): Promise<Prisma.TodoUpdateInput | null> {
        return await this.todoService.update(id, newTodo);
    }

    async findById(id: string):  Promise<PrismaTodoCLient | null> {
        return await this.todoService.findById(id);
    }

    async delete(id: string): Promise<void> {
        return await this.todoService.delete(id);
    }
    
}