import { INestApplication, ValidationPipe } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import request from 'supertest';
import { AppModule } from "./../src/app.module";

describe('CardController (e2e)', () => {
  let app: INestApplication;

  const mockCardModel = {
    create: jest.fn().mockResolvedValue({}),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getModelToken('Card'))
      .useValue(mockCardModel)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); 
    await app.init();
  });

  it('/card/validate (POST) - Success', () => {
    return request(app.getHttpServer())
      .post('/card/validate')
      .send({ cardNumber: '4111 1111 1111 1111' })
      .expect(200)
      .expect((res) => {
        expect(res.body.isValid).toBe(true);
      });
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});