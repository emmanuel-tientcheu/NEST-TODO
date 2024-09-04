import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import * as request from "supertest"
import { User } from "../entities/user";
import { UserService } from "../services/user.service";
import { POSTGRESQLUserRepository } from "../adapters/postgre-sql-user.repository";
import { PrismaService } from "../../core/prima.service";


describe("Feature: get user by email address", () => {
    let app: INestApplication;
    let repository: POSTGRESQLUserRepository;
    let userService: UserService;


    beforeEach(async () => {
        
        const module = await Test.createTestingModule({
            imports:[AppModule],
            providers: [
                PrismaService,
                UserService, // Fournir le UserService
                {
                  provide: POSTGRESQLUserRepository,
                  inject: [UserService],
                  useFactory: (userService: UserService) => {
                    return new POSTGRESQLUserRepository(userService);
                  }
                },
              ],
              
        }).compile()

        repository = module.get<POSTGRESQLUserRepository>(POSTGRESQLUserRepository);
        userService = module.get<UserService>(UserService);

        app = module.createNestApplication();
        await app.init();
    })

    it('should be defined', () => {
        expect(repository).toBeDefined();
        expect(userService).toBeDefined();
      });

      describe("happy path", () => {
          it("Scenario: should get user", async () => {
              const user = new User({
                  id: "id-5",
                  email: "test5@gmail.com",
                  password: "password",
              });
      
              userService.create(user);
      
              const result = await request(app.getHttpServer())
                          .get(`/user/${user.email}`);
              
              expect(result.status).toBe(200);
              expect(result.body.email).toBe(user.email);
          })

      })

})