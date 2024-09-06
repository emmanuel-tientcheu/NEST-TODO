import { extractToken } from "./extract-token"

describe("extract token", () => {
    it("should extract token", () => {
        expect(extractToken("Basic 123")).toBe("123")
        expect(extractToken("test 123")).toEqual(null)
        expect(extractToken("123123")).toEqual(null)
        expect(extractToken("")).toEqual(null)
    })
})