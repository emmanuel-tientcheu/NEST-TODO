import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CreateSubtask } from "../usecases/create-subtask";
import { FindSubtaskById } from "../usecases/find-subtask-by-id";
import { ZodevalidationPipe } from "../../core/pipes/zode-validation.pipe";
import { SubtaskApi } from "../../user/contract";
import { UpdateSubtask } from "../usecases/update-subtask";

@Controller("/subtasks")
export class SubTaskController {
    constructor(
        private readonly createSubtask: CreateSubtask,
        private readonly findSubtaskById: FindSubtaskById,
        private readonly updateSubtask: UpdateSubtask
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

    @Put("/:id")
    async handleUpdateSubtask(
        @Body(new ZodevalidationPipe(SubtaskApi.UpdateSubtask.schema)) body: SubtaskApi.UpdateSubtask.Request,
        @Param("id") id: string 
    ) {
        return await this.updateSubtask.execute(id, {
            title: body.title
        })
    }
}