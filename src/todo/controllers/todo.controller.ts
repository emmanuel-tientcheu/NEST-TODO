import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTodo } from "../usecases/create-todo";
import { ZodevalidationPipe } from "src/core/pipes/zode-validation.pipe";
import { TodoApi } from "src/user/contract";
import { UpdateTodo } from "../usecases/update-todo";
import { FindTodoById } from "../usecases/find-to-by-id";

@Controller("/todos")
export class TodoController {
    constructor(
        private readonly createTodo: CreateTodo,
        private readonly updateTodo: UpdateTodo,
        private readonly findTodoById: FindTodoById
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

    @Get("/:id")
    async handleFindTodoById(@Param('id') id: string) {
        return await this.findTodoById.execute(id);
    }

}