import { Prisma, Status } from "@prisma/client";
import { TodoStatus } from "./todoStatus"

type TodoProps = {
    id: string,
    userId: string,
    title: string,
    description: string,
    status: TodoStatus
}

export class Todo {
    constructor(public props: TodoProps) {}


    toPrisma(): Prisma.TodoCreateInput {
        return {
          id: this.props.id,
          title: this.props.title,
          description: this.props.description,
          user: { connect: { id: this.props.userId } },
          status: this.mapStatus(this.props.status)
        };
      }


     mapStatus(status: TodoStatus): Status {
        switch (status) {
          case TodoStatus.TODO:
            return 'TODO';
          case TodoStatus.DOING:
            return 'DOING';
          case TodoStatus.DONE:
            return 'DONE';
          default:
            throw new Error(`Invalid status: ${status}`);
        }
      }
    
}