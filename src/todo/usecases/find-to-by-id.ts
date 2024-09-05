import { IUserRepository } from "src/user/ports/user-repository.interface";
import { ITodoRepository } from "../ports/todo-repository-interface";

export class FindTodoById {
    constructor(
        // private readonly userRepository: IUserRepository,
        private readonly todoRepository: ITodoRepository,
    ) {}

    async execute(todoId: string) {
        var todo = await this.todoRepository.findById(todoId);

        if(todo === null) throw new Error("Todo not found");

        return todo;
    }
}