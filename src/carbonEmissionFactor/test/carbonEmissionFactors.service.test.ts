import { BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";
import { dataSource, GreenlyDataSource } from "../../../config/dataSource";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { CarbonEmissionFactor } from "../carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "../carbonEmissionFactors.service";
import {
  CHEESE_EMISSION_FACTOR,
  FLOUR_EMISSION_FACTOR,
  HAM_EMISSION_FACTOR,
} from "./carbonEmissionFactor.constants";

let carbonEmissionFactorsService: CarbonEmissionFactorsService;
let carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>;

beforeAll(async () => {
  await dataSource.initialize();
  carbonEmissionFactorRepository =
    await dataSource.getRepository(CarbonEmissionFactor);
  carbonEmissionFactorsService = new CarbonEmissionFactorsService(
    carbonEmissionFactorRepository
  );
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("CarbonEmissionFactors.service", () => {
  describe("findAll", () => {
    it("should retrieve carbon emission factors", async () => {
      await carbonEmissionFactorRepository.save(HAM_EMISSION_FACTOR);

      const carbonEmissionFactors: CarbonEmissionFactor[] =
        await carbonEmissionFactorsService.findAll();
      expect(carbonEmissionFactors).toHaveLength(1);
      expect(carbonEmissionFactors[0]).toEqual(HAM_EMISSION_FACTOR);
    });

    it("should throw when emission carbon factors are not found", async () => {
      expect(carbonEmissionFactorsService.findAll()).rejects.toThrow(
        "No carbon emission factors found"
      );
    });
  });

  describe("findAllByIngredientsAndSource", () => {
    it("should find carbon emission factors by ingredients and source", async () => {
      await carbonEmissionFactorRepository.save([
        HAM_EMISSION_FACTOR,
        FLOUR_EMISSION_FACTOR,
        CHEESE_EMISSION_FACTOR,
      ]);

      const carbonEmissionFactors: CarbonEmissionFactor[] =
        await carbonEmissionFactorsService.findAllByIngredientsAndSource(
          ["ham", "flour"],
          CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
        );

      expect(carbonEmissionFactors).toHaveLength(2);
      expect(carbonEmissionFactors).toEqual([
        HAM_EMISSION_FACTOR,
        FLOUR_EMISSION_FACTOR,
      ]);
    });

    it("should throw when carbon emission factors are missing", async () => {
      await carbonEmissionFactorRepository.save(HAM_EMISSION_FACTOR);

      await expect(
        carbonEmissionFactorsService.findAllByIngredientsAndSource(
          ["ham", "flour"],
          CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
        )
      ).rejects.toThrow(
        new BadRequestException(
          "Only 1 carbon emission factor(s) found for source Agrybalise, 2 expected"
        )
      );
    });
  });

  describe("create", () => {
    it("should create new carbon emission factor", async () => {
      await carbonEmissionFactorsService.create(HAM_EMISSION_FACTOR);

      const retrievedHamCarbonEmissionFactors: CarbonEmissionFactor[] | null =
        await carbonEmissionFactorRepository.find();

      expect(retrievedHamCarbonEmissionFactors).toHaveLength(1);
      expect(retrievedHamCarbonEmissionFactors[0]).toEqual(HAM_EMISSION_FACTOR);
    });

    it("should throw if an emission carbon factor with same name and source already exists", async () => {
      await carbonEmissionFactorRepository.save(HAM_EMISSION_FACTOR);

      await expect(
        carbonEmissionFactorsService.create(HAM_EMISSION_FACTOR)
      ).rejects.toThrow(
        "An emission factor with name ham and source Agrybalise already exists"
      );
    });
  });
});
