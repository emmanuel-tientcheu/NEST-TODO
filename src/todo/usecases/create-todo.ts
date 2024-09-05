import { IDGenerator } from "src/user/ports/id-generator.interface";
import { IUserRepository } from "../../user/ports/user-repository.interface";
import { ITodoRepository } from "../ports/todo-repository-interface";
import { isValidStatus, stringToTodoStatus, TodoStatus } from "../entities/todoStatus";
import { Todo } from "../entities/todo";

export class CreateTodo {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly todoRepository: ITodoRepository,
        private readonly idGenerator: IDGenerator

    ){}

    async execute(data: {
        userId: string,
        title: string,
        description: string,
        status: string
    }) {

        if(!isValidStatus(data.status)) {
            throw new Error(`the value ${data.status} is not defined`)
        }

        const user = await this.userRepository.findById(data.userId);

        if(user == null) throw new Error(`user not found`);

        const id = this.idGenerator.generate()

        const todo = new Todo({
            id,
            userId: data.userId,
            title: data.title,
            description: data.description,
            status: stringToTodoStatus(data.status)
        });

        this.todoRepository.create(todo);

        return {id}

    }
}