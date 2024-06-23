import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { GreenlyDataSource } from "../../../config/dataSource";
import { AppModule } from "../../app.module";

export const prepareE2eTest = async (
  app: INestApplication
): Promise<INestApplication> => {
  await GreenlyDataSource.cleanDatabase();

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  await app.init();

  return app;
};
