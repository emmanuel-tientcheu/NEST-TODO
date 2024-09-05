import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { CreateTodo } from "../usecases/create-todo";
import { ZodevalidationPipe } from "src/core/pipes/zode-validation.pipe";
import { TodoApi } from "src/user/contract";
import { UpdateTodo } from "../usecases/update-todo";

@Controller("/todos")
export class TodoController {
    constructor(
        private readonly createTodo: CreateTodo,
        private readonly updateTodo: UpdateTodo
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

    @Put("/:id")
    async handleUpdateTodo(
        @Body(new ZodevalidationPipe(TodoApi.UpdateTodo.schema)) body: TodoApi.UpdateTodo.Request,
        @Param('id') id: string
    ) {
        return await this.updateTodo.execute(id, {
            userId: body.userId,
            title: body.title,
            description: body.description,
            status: body.status,
        })
    }

}