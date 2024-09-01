import { Prisma } from "@prisma/client"

type UserProps = {
    id: string,
    email: string,
    password: string
}

export class User implements Prisma.UserCreateInput {
    id: string;  
    email: string;
    password: string;

    constructor(public props: UserProps) {
        
    }

    static fromPrisma(data: { id: string; email: string; password: string }): User {
      return new User({
        id: data.id,
        email: data.email,
        password: data.password,
      });
    }

    toPrisma(): Prisma.UserCreateInput {
        return {
          id: this.props.id,
          email: this.props.email,
          password: this.props.password,
        };
      }
}