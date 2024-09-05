import { Prisma } from "@prisma/client";
import { Todo } from "../entities/todo";
import { Todo as PrismaTodoCLient} from "@prisma/client";

export interface ITodoRepository {
    create(todo: Todo): Promise<void>;
    update(id: string, newTodo: Todo): Promise<Prisma.TodoUpdateInput | null>;
    findById(id: string): Promise<PrismaTodoCLient | null>;
    delete(id: string): Promise<void>;
}