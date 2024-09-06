import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CreateSubtask } from "../usecases/create-subtask";
import { FindSubtaskById } from "../usecases/find-subtask-by-id";
import { ZodevalidationPipe } from "../../core/pipes/zode-validation.pipe";
import { SubtaskApi } from "../../user/contract";
import { UpdateSubtask } from "../usecases/update-subtask";
import { DeleteSubtask } from "../usecases/delete-subtask";
import { ApiResponse } from "src/core/api.response";
import { Response } from 'express';


@Controller("/subtasks")
export class SubTaskController {
    constructor(
        private readonly createSubtask: CreateSubtask,
        private readonly findSubtaskById: FindSubtaskById,
        private readonly updateSubtask: UpdateSubtask,
        private readonly deleteSubtask: DeleteSubtask
    ) {}

    @Post("/add")
    async handleCreateSubtask(
        @Body(new ZodevalidationPipe(SubtaskApi.CreateSubtask.schema)) body: SubtaskApi.CreateSubtask.Request,
        @Res() res: Response
    ) {
        const result = await this.createSubtask.execute({
            todoId: body.todoId,
            title: body.title
        });
        
        const response = new ApiResponse(HttpStatus.CREATED, "Subtask created", result);
        res.status(HttpStatus.CREATED).json(response);
    }

    @Get("/:id")
    async handleFindSubtaskById(
        @Param("id") id: string,
        @Res() res: Response

    ) {
        const result = await this.findSubtaskById.execute(id);

        const response = new ApiResponse(HttpStatus.OK, "Subtask find", result);
        res.status(HttpStatus.OK).json(response);
    }

    @Put("/:id")
    async handleUpdateSubtask(
        @Body(new ZodevalidationPipe(SubtaskApi.UpdateSubtask.schema)) body: SubtaskApi.UpdateSubtask.Request,
        @Param("id") id: string,
        @Res() res: Response

    ) {
        const result = await this.updateSubtask.execute(id, {
            title: body.title
        });

        const response = new ApiResponse(HttpStatus.OK, "Subtask update", result);
        res.status(HttpStatus.OK).json(response);
    }

    @Delete("/:id")
    async handleDeleteSubtask(@Param('id') id: string, @Res() res: Response) {
        const result = await this.deleteSubtask.execute(id);

        const response = new ApiResponse(HttpStatus.NO_CONTENT, "Subtask update", result);
        res.status(HttpStatus.NO_CONTENT).json(response);
    }
}