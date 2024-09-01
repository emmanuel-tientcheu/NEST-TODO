import { IDGenerator } from "../ports/id-generator.interface";

export class FixedIdGenerator implements IDGenerator{
    generate(): string {
        return "id-1"
    }
}