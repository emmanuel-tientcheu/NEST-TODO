import { z } from "zod";

export namespace UserApi {
    export namespace CreateUser {
        export const schema = z.object({
            email: z.string(),
            password: z.string(),
          });

        export type Request =  z.infer<typeof schema>
        export type Response = { 
            id: String 
        };
    }
}

export namespace TodoApi {
    export namespace CreateTodo {
        export const schema = z.object({
            userId: z.string(),
            title: z.string(),
            description: z.string(),
            status: z.string()
        });
        export type Request =  z.infer<typeof schema>;
        export type Response = { 
            id: String 
        };
    };

    export namespace UpdateTodo {
        export const schema = z.object({
            userId: z.string(),
            title: z.string(),
            description: z.string(),
            status: z.string() 
        });
        export type Request =  z.infer<typeof schema>;
    }


}

export namespace SubtaskApi {
    export namespace CreateSubtask {
        export const schema = z.object({
            todoId: z.string(),
            title: z.string(),
        });
        export type Request =  z.infer<typeof schema>;
    };

    export namespace UpdateSubtask {
        export const schema = z.object({
            title: z.string(),
        });
        export type Request =  z.infer<typeof schema>;
    }
}