import { Todo } from "../entities/todo";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { TodoService } from "../services/todo.service";

export class POSTGRESQLTodoRepository implements ITodoRepository {

    constructor(private readonly todoService: TodoService) {}

    async create(todo: Todo): Promise<void> {
        return await this.todoService.create(todo)
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