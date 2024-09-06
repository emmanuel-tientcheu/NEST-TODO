import { ITodoRepository } from "../ports/todo-repository-interface";

export class FindTodoByIdWithSubtasks {
    constructor(
        private readonly todoRepository: ITodoRepository,
    ) {}

    async execute(todoId: string) {
        var todo = await this.todoRepository.findByIdWithSubtasks(todoId);

        if(todo === null) throw new Error("Todo not found");

        return todo;
    }
}