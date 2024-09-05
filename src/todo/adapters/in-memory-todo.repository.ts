import { error } from "console";
import { Todo } from "../entities/todo";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { promise } from "zod";

export class InMemoryTodoRepository implements ITodoRepository{

    database: Todo[] = [];

    async create(todo: Todo): Promise<void> {
        this.database.push(todo);
    }

    async update(id: string, newTodo: Partial<Omit<Todo, 'id'>>): Promise<Todo> {
        const index = this.database.findIndex(todo => todo.props.id == id);
        if(index == -1) throw error(`todo with id ${id} not found`);

        const existingTodo = this.database[index];

        existingTodo.props = {
            ...existingTodo.props,
            ...newTodo.props,
        };
        this.database[index] = existingTodo;
        
        return Promise.resolve(this.database[index])
    }

    async findById(id: string): Promise<Todo | null> {
        return this.database.find(todo => todo.props.id) ?? null
    }

    async delete(id: string): Promise<void> {
        const index = this.database.findIndex(todo => todo.props.id == id);
        if(index == -1) throw error(`todo with id ${id} not found`);

        this.database.splice(index, 1);
    }


}