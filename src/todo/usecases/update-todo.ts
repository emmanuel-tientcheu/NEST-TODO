import { IUserRepository } from "src/user/ports/user-repository.interface";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { isValidStatus, stringToTodoStatus } from "../entities/todoStatus";
import { Todo } from "../entities/todo";


export class UpdateTodo {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly todoRepository: ITodoRepository,
    ) {}

    async execute(
        todoId: string,
        data: {
            userId: string,
            title: string,
            description: string,
            status: string
        }
    ) {

        const user = await this.userRepository.findById(data.userId);
        if(user === null) throw new Error("User not found");

        const prismaTodo = await this.todoRepository.findById(todoId);
        if(prismaTodo.userId != data.userId) throw new Error("this user is not authorize to perform this action");


        if(!isValidStatus(data.status)) {
            throw new Error(`the value ${data.status} is not defined`)
        }
        const newTodo: Todo = new Todo({
            id: todoId,
            userId: data.userId,
            title: data.title,
            description: data.description,
            status: stringToTodoStatus(data.status)
        });

        const result = await this.todoRepository.update(todoId, newTodo);
        return result;
          
    }
}