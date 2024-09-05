import { Body, Controller, Post } from "@nestjs/common";
import { CreateTodo } from "../usecases/create-todo";
import { ZodevalidationPipe } from "src/core/pipes/zode-validation.pipe";
import { TodoApi } from "src/user/contract";
import { promises } from "dns";

@Controller("/todos")
export class TodoController {
    constructor(
        private readonly createTodo: CreateTodo
    ) {}

    @Post()
    async handleCreateTodo(
        @Body(new ZodevalidationPipe(TodoApi.CreateTodo.schema)) body: TodoApi.CreateTodo.Request
    ): Promise<TodoApi.CreateTodo.Response> {

        const result = await this.createTodo.execute({
            userId: body.userId,
            title: body.title,
            description: body.description,
            status: body.status
        });
        return result;

    }
}