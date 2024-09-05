import { Todo } from "../entities/todo";

export interface ITodoRepository {
    create(todo: Todo): Promise<void>;
    update(id: string, newTodo: Partial<Omit<Todo, 'id'>>): Promise<Todo>;
    findById(id: string): Promise<Todo | null>;
    delete(id: string): Promise<void>;
}