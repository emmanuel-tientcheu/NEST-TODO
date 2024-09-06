import { ITodoRepository } from "../ports/todo-repository-interface";

export class FindAllTodoByUser {
    constructor(private readonly todoRepository: ITodoRepository) {}

    async execute(userId: string) {
       const result = await this.todoRepository.findAllTodoByUser(userId);
       return result;
    }
}