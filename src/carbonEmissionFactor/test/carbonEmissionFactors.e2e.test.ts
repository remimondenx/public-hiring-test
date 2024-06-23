import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { dataSource } from "../../../config/dataSource";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../../shared/enum/unit";
import { prepareE2eTest } from "../../shared/testUtils/prepareE2e";
import { CarbonEmissionFactor } from "../carbonEmissionFactor.entity";
import {
  CHEESE_EMISSION_FACTOR,
  HAM_EMISSION_FACTOR,
} from "./carbonEmissionFactor.constants";

beforeAll(async () => {
  await dataSource.initialize();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("CarbonEmissionFactors.Controller", () => {
  let app: INestApplication;
  let defaultCarbonEmissionFactors: CarbonEmissionFactor[];

  beforeEach(async () => {
    app = await prepareE2eTest(app);

    await dataSource
      .getRepository(CarbonEmissionFactor)
      .save([HAM_EMISSION_FACTOR, CHEESE_EMISSION_FACTOR]);

    defaultCarbonEmissionFactors = await dataSource
      .getRepository(CarbonEmissionFactor)
      .find();
  });

  describe("GET /carbon-emission-factors", () => {
    it("should get carbon emission factors", async () => {
      return request(app.getHttpServer())
        .get("/carbon-emission-factors")
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual(defaultCarbonEmissionFactors);
        });
    });
  });

  describe("POST /carbon-emission-factors", () => {
    it("should create carbon emission factor", async () => {
      const carbonEmissionFactorArgs = {
        name: "Test Carbon Emission Factor",
        unit: UNIT.KG,
        emissionCO2eInKgPerUnit: 12,
        source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
      };
      return request(app.getHttpServer())
        .post("/carbon-emission-factors")
        .send(carbonEmissionFactorArgs)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toMatchObject(carbonEmissionFactorArgs);
        });
    });

    it("should throw with invalid inputs", async () => {
      return request(app.getHttpServer())
        .post("/carbon-emission-factors")
        .send({
          name: "name",
          unit: "not-a-unit",
          emissionCO2eInKgPerUnit: "not-a-number",
          source: "unknown-source",
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toEqual([
            "unit must be one of the following values: kg, l",
            "emissionCO2eInKgPerUnit must not be less than 0",
            "emissionCO2eInKgPerUnit must be a number conforming to the specified constraints",
            "source must be one of the following values: Agrybalise",
          ]);
        });
    });

    it("should throw with negative emissions", async () => {
      return request(app.getHttpServer())
        .post("/carbon-emission-factors")
        .send({
          name: "name",
          unit: UNIT.KG,
          emissionCO2eInKgPerUnit: -1,
          source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toEqual([
            "emissionCO2eInKgPerUnit must not be less than 0",
          ]);
        });
    });
  });
});
