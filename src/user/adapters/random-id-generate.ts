import { IDGenerator } from "../ports/id-generator.interface";
import { v4 } from "uuid";

export class RandomIdGenerate implements IDGenerator {
    generate(): string {
        return v4();
    }
}