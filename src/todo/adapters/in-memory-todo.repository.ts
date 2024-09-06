import { error } from "console";
import { Todo } from "../entities/todo";
import { Prisma, Todo as PrismaTodoClient} from "@prisma/client";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { promise } from "zod";
import { Todo as PrismaTodoCLient} from "@prisma/client";


export class InMemoryTodoRepository implements ITodoRepository{

    database: Todo[] = [];

    async create(todo: Todo): Promise<void> {
        this.database.push(todo);
    }

    async update(id: string, newTodo: Todo): Promise<Prisma.TodoUpdateInput | null> {
        const index = this.database.findIndex(todo => todo.props.id == id);
        if(index == -1) throw error(`todo with id ${id} not found`);

        const existingTodo = this.database[index];

        existingTodo.props = {
            ...existingTodo.props,
            ...newTodo.props,
        };
        this.database[index] = existingTodo;
        
        return Promise.resolve(this.database[index].toPrisma())
    }

    async findById(id: string): Promise<PrismaTodoCLient | null> {
        const todo = this.database.find(todo => todo.props.id === id) ?? null;

        if (!todo) {
            return null;
        }

        return {
            id: todo.props.id,
            title: todo.props.title,
            description: todo.props.description,
            userId: todo.props.userId,
            status: todo.mapStatus(todo.props.status),
        };
    }

    async delete(id: string): Promise<void> {
        const index = this.database.findIndex(todo => todo.props.id == id);
        if(index == -1) throw error(`todo with id ${id} not found`);

        this.database.splice(index, 1);
    }


}