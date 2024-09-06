import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseGuards } from "@nestjs/common";
import { CreateTodo } from "../usecases/create-todo";
import { ZodevalidationPipe } from "src/core/pipes/zode-validation.pipe";
import { TodoApi } from "src/user/contract";
import { UpdateTodo } from "../usecases/update-todo";
import { FindTodoById } from "../usecases/find-to-by-id";
import { DeleteTodo } from "../usecases/delete-todo";
import { FindTodoByIdWithSubtasks } from "../usecases/find-todo-by-id-with-subtasks";
import { response, Response } from 'express';
import { ApiResponse } from "../../core/api.response";
import { User as PrismaCLient} from "@prisma/client"
import { FindAllTodoByUser } from "../usecases/find-all-todo-by-user";


@Controller("/todos")
export class TodoController {
    constructor(
        private readonly createTodo: CreateTodo,
        private readonly updateTodo: UpdateTodo,
        private readonly findTodoById: FindTodoById,
        private readonly deleteTodo: DeleteTodo,
        private readonly findTodoByIdWithSubtasks: FindTodoByIdWithSubtasks,
        private readonly findAllTodoByUser: FindAllTodoByUser
    ) {}

    @Post()
    async handleCreateTodo(
        @Body(new ZodevalidationPipe(TodoApi.CreateTodo.schema)) body: TodoApi.CreateTodo.Request,
        @Res() res: Response
    ) {

        const result = await this.createTodo.execute({
            userId: body.userId,
            title: body.title,
            description: body.description,
            status: body.status
        });
        
        const response = new ApiResponse(HttpStatus.CREATED, "Todo updated", result);
        res.status(HttpStatus.CREATED).json(response);
    }

    @Put("/:id")
    async handleUpdateTodo(
        @Body(new ZodevalidationPipe(TodoApi.UpdateTodo.schema)) body: TodoApi.UpdateTodo.Request,
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const result = await this.updateTodo.execute(id, {
            userId: body.userId,
            title: body.title,
            description: body.description,
            status: body.status,
        });

        const response = new ApiResponse(HttpStatus.OK, "Todo updated", result);
        res.status(HttpStatus.OK).json(response);
    }

    @Get("/:id")
    async handleFindTodoById(@Param('id') id: string, @Res() res: Response) {
        const result = await this.findTodoById.execute(id);

        const response = new ApiResponse(HttpStatus.OK, "Todo find", result);
        res.status(HttpStatus.OK).json(response);
    }

    @Get()
    async handleFindAllTodoByUser(@Request() request: {user: PrismaCLient}, @Res() res: Response) {
        const result = await this.findAllTodoByUser.execute(request.user.id);

        const response = new ApiResponse(HttpStatus.OK, "Todos find", result);
        res.status(HttpStatus.OK).json(response);
    }

    @Get("/:id/subtasks")
    async handleFindTodoByIdWithSubtasks(@Param('id') id: string, @Res() res: Response) {
        const result = await this.findTodoByIdWithSubtasks.execute(id);

        const response = new ApiResponse(HttpStatus.OK, "Todos find", result);
        res.status(HttpStatus.OK).json(response);
    }

    @Delete("/:id")
    async handleDeleteTodo(@Param('id') id: string, @Res() res: Response) {
        const result = await this.deleteTodo.execute(id);

        const response = new ApiResponse(HttpStatus.NO_CONTENT, "Todo deleted", result);
        res.status(HttpStatus.NO_CONTENT).json(response);
    }

}