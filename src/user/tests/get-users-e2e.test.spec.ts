import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import * as request from "supertest"


describe("Feature: GetUser", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

       app = module.createNestApplication();
       await app.init();
    })

    it("get all user", async () => {
        const result = await request(app.getHttpServer())
            .get('/get-users');

        expect(result.status).toBe(200)

    })
})