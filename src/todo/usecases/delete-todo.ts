import { ITodoRepository } from "../ports/todo-repository-interface";

export class DeleteTodo {
    constructor(private readonly todoRepository: ITodoRepository) {}

    async execute(id: string) {
        var todo = await this.todoRepository.findById(id);
        if(todo === null) throw new Error("Todo not found");

        await this.todoRepository.delete(id);

        return {id};
    }
}