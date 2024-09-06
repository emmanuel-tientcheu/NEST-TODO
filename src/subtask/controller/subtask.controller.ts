import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateSubtask } from "../usecases/create-subtask";
import { FindSubtaskById } from "../usecases/find-subtask-by-id";
import { ZodevalidationPipe } from "../../core/pipes/zode-validation.pipe";
import { SubtaskApi } from "../../user/contract";

@Controller("/subtasks")
export class SubTaskController {
    constructor(
        private readonly createSubtask: CreateSubtask,
        private readonly findSubtaskById: FindSubtaskById
    ) {}

    @Post("/add")
    async handleCreateSubtask(
        @Body(new ZodevalidationPipe(SubtaskApi.CreateSubtask.schema)) body: SubtaskApi.CreateSubtask.Request
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