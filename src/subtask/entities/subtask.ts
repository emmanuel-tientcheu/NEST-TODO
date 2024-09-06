import { Prisma } from "@prisma/client"

type SubtaskProps = {
    id: string,
    title: string,
    todoId: string
}

export class Subtask {
    constructor(public props: SubtaskProps) {}

    toPrisma(): Prisma.SubtaskCreateInput {
        return {
            id: this.props.id,
            title: this.props.title,
            todo : {connect: {id: this.props.todoId}}
        }
    }
}

