import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSubtask } from "../usecases/create-subtask";
import { FindSubtaskById } from "../usecases/find-subtask-by-id";

@Controller("/subtasks")
export class SubTaskController {
    constructor(
        private readonly createSubtask: CreateSubtask,
        private readonly findSubtaskById: FindSubtaskById
    ) {}

    @Post("/add")
    async handleCreateSubtask(
        @Body() body: {
            todoId: string,
            title: string
        },
    ) {
        const result = await this.createSubtask.execute({
            todoId: body.todoId,
            title: body.title
        });
        return result;
    }

    @Get("/:id")
    async handleFindSubtaskById(
        @Param("id") id: string
    ) {
        return await this.findSubtaskById.execute(id);
    }
}