import { error } from "console";
import { Todo } from "../entities/todo";
import { Prisma, Todo as PrismaTodoClient, Subtask} from "@prisma/client";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { Todo as PrismaTodoCLient} from "@prisma/client";
import { InMemorySubtaskRepository } from "../../subtask/adapters/in-memory-subtask.resposiotry";
import { title } from "process";


export class InMemoryTodoRepository implements ITodoRepository {

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

    async findByIdWithSubtasks(id: string): Promise<(PrismaTodoCLient & { subtasks: Subtask[]; }) | null> {
        const subtaskRepository = new InMemorySubtaskRepository();
      
        const todo = this.database.find(todo => todo.props.id === id) ?? null;

        if (!todo) {
            return null;
        }

        console.log(subtaskRepository.database);
        
        const subtasks = subtaskRepository.database
            .filter(subtask => subtask.props.todoId === id)
            .map(subtask => ({
                id: subtask.props.id,
                title: subtask.props.title,
                todoId: id
              }));

        return {
            id: todo.props.id,
            title: todo.props.title,
            description: todo.props.description,
            userId: todo.props.userId,
            status: todo.mapStatus(todo.props.status),
            subtasks
        };
    }

    async findAllTodoByUser(userId: string): Promise<PrismaTodoClient[] | null> {
        return this.database
            .filter(todo => todo.props.userId === userId)
            .map(todoClient => ({
                id: todoClient.props.id,
                userId: todoClient.props.userId,
                title: todoClient.props.title,
                description: todoClient.props.description,
                status: todoClient.mapStatus(todoClient.props.status)
            }))
    }
}