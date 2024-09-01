import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import * as request from "supertest"
import { AppModule } from "../../app.module"

describe("Feature: create user", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile()

       app = module.createNestApplication();
       await app.init();
    })

    it("scenario: happy path", async () => {
        const result = await request(app.getHttpServer())
            .post('/create-user')
            .send({
                email: 'johndoe@gmail.com',
                password: 'password'
            })

            expect(result.status).toBe(201)
            expect(result.body).toEqual({id: expect.any(String)})
        
    })
})