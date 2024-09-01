import { z } from "zod";

export namespace UserApi {
    export namespace CreateUser {
        export const schema = z.object({
            email: z.string(),
            password: z.string(),
          })

        export type Request =  z.infer<typeof schema>
        export type Response = { 
            id: String 
        }
    }
}