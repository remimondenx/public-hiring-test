import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { dataSource } from "../../../config/dataSource";
import { CarbonEmissionFactor } from "../../carbonEmissionFactor/carbonEmissionFactor.entity";
import { CARBON_EMISSION_FACTORS } from "../../carbonEmissionFactor/test/carbonEmissionFactor.constants";
import { Recipe } from "../../recipe/recipe.entity";
import { HAM_CHEESE_PIZZA } from "../../recipe/test/recipe.constants";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { prepareE2eTest } from "../../shared/testUtils/prepareE2e";
import { CarbonFootprint } from "../carbonFootprint.entity";
import { hamCheesePizzaCarbonFootprintFactory } from "./carbonFootprint.constants";

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("CarbonFootprints.Controller", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await prepareE2eTest(app);
  });

  describe("GET /carbon-footprints", () => {
    it("should get all carbon footprints", async () => {
      const hamCheesePizzaCarbonFootprint: CarbonFootprint =
        hamCheesePizzaCarbonFootprintFactory();
      await dataSource
        .getRepository(Recipe)
        .save(hamCheesePizzaCarbonFootprint.recipe);
      await dataSource
        .getRepository(CarbonFootprint)
        .save(hamCheesePizzaCarbonFootprint);

      return request(app.getHttpServer())
        .get("/carbon-footprints")
        .expect(200)
        .expect(({ body }) => {
          expect(body).toHaveLength(1);
          expect(body[0].emissionCO2eInKgPerUnit).toBe(0.224);
          expect(body[0].source).toBe(CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE);
        });
    });
  });

  describe("GET /carbon-footprints/:id", () => {
    it("should get a carbon footprint by id", async () => {
      const hamCheesePizzaCarbonFootprint: CarbonFootprint =
        hamCheesePizzaCarbonFootprintFactory();
      await dataSource
        .getRepository(Recipe)
        .save(hamCheesePizzaCarbonFootprint.recipe);
      await dataSource
        .getRepository(CarbonFootprint)
        .save(hamCheesePizzaCarbonFootprint);

      return request(app.getHttpServer())
        .get(`/carbon-footprints/${hamCheesePizzaCarbonFootprint.id}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body.emissionCO2eInKgPerUnit).toBe(0.224);
          expect(body.source).toBe(CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE);
        });
    });

    it("should throw with invalid inputs", async () => {
      return request(app.getHttpServer())
        .get("/carbon-footprints/not-a-number")
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toEqual(["id must be an integer number"]);
        });
    });
  });

  describe("POST /carbon-footprints", () => {
    it("should compute a carbon footprint", async () => {
      await dataSource
        .getRepository(CarbonEmissionFactor)
        .save(CARBON_EMISSION_FACTORS);
      const recipe: Recipe = await dataSource
        .getRepository(Recipe)
        .save(HAM_CHEESE_PIZZA);

      return request(app.getHttpServer())
        .post("/carbon-footprints")
        .query({
          recipeId: recipe.id,
          source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
        })
        .expect(201)
        .expect(({ body }) => {
          expect(body).toEqual({
            emissionCO2eInKgPerUnit: 0.224,
            id: expect.any(Number),
            recipe,
            source: "Agrybalise",
          });
        });
    });

    it("should throw with invalid inputs", async () => {
      return request(app.getHttpServer())
        .post("/carbon-footprints")
        .query({
          recipeId: "not-a-number",
          source: "unknown-source",
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toEqual([
            "recipeId must be an integer number",
            "source must be one of the following values: Agrybalise",
          ]);
        });
    });
  });
});
