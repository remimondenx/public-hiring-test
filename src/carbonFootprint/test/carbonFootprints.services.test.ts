import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { GreenlyDataSource, dataSource } from "../../../config/dataSource";
import { CarbonEmissionFactor } from "../../carbonEmissionFactor/carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "../../carbonEmissionFactor/carbonEmissionFactors.service";
import { carbonEmissionFactorsFactory } from "../../carbonEmissionFactor/test/carbonEmissionFactor.constants";
import { Recipe } from "../../recipe/recipe.entity";
import { RecipesService } from "../../recipe/recipes.service";
import { hamCheesePizzaFactory } from "../../recipe/test/recipe.constants";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { C02eEmissionsCalculatorService } from "../c02eEmissionsCalculator.service";
import { CarbonFootprint } from "../carbonFootprint.entity";
import { CarbonFootprintsService } from "../carbonFootprints.service";
import { hamCheesePizzaCarbonFootprintFactory } from "./carbonFootprint.constants";

let carbonFootprintsService: CarbonFootprintsService;
let carbonFootprintRepository: Repository<CarbonFootprint>;
let recipeRepository: Repository<Recipe>;
let carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>;

beforeAll(async () => {
  await dataSource.initialize();
  carbonFootprintRepository = await dataSource.getRepository(CarbonFootprint);
  recipeRepository = await dataSource.getRepository(Recipe);
  carbonEmissionFactorRepository =
    await dataSource.getRepository(CarbonEmissionFactor);

  let recipesService: RecipesService = new RecipesService(recipeRepository);
  let carbonEmissionFactorsService: CarbonEmissionFactorsService =
    new CarbonEmissionFactorsService(carbonEmissionFactorRepository);

  carbonFootprintsService = new CarbonFootprintsService(
    carbonFootprintRepository,
    carbonEmissionFactorsService,
    recipesService
  );
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
  jest.clearAllMocks();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("CarbonFootprints.service", () => {
  describe("findAll", () => {
    it("should retrieve carbonFootprints", async () => {
      const hamCheesePizzaCarbonFootprint: CarbonFootprint =
        hamCheesePizzaCarbonFootprintFactory();
      await recipeRepository.save(hamCheesePizzaCarbonFootprint.recipe);
      await carbonFootprintRepository.save(hamCheesePizzaCarbonFootprint);

      const carbonFootprints: CarbonFootprint[] =
        await carbonFootprintsService.findAll();
      expect(carbonFootprints).toHaveLength(1);
      expect(carbonFootprints[0].emissionCO2eInKgPerUnit).toEqual(
        hamCheesePizzaCarbonFootprint.emissionCO2eInKgPerUnit
      );
      expect(carbonFootprints[0].source).toEqual(
        hamCheesePizzaCarbonFootprint.source
      );
    });

    it("should throw when carbon footprints are not found", async () => {
      expect(carbonFootprintsService.findAll()).rejects.toThrow(
        "No carbon footprints found"
      );
    });
  });

  describe("findOneById", () => {
    it("should find a carbon footprint by id", async () => {
      const hamCheesePizzaCarbonFootprint: CarbonFootprint =
        hamCheesePizzaCarbonFootprintFactory();
      await recipeRepository.save(hamCheesePizzaCarbonFootprint.recipe);
      const savedCarbonFootprint: CarbonFootprint =
        await carbonFootprintRepository.save(hamCheesePizzaCarbonFootprint);

      const retrievedCarbonFootprint: CarbonFootprint =
        await carbonFootprintsService.findOneById(savedCarbonFootprint.id);

      expect(retrievedCarbonFootprint.id).toBe(savedCarbonFootprint.id);
      expect(retrievedCarbonFootprint.emissionCO2eInKgPerUnit).toBe(
        hamCheesePizzaCarbonFootprint.emissionCO2eInKgPerUnit
      );
      expect(retrievedCarbonFootprint.source).toBe(
        hamCheesePizzaCarbonFootprint.source
      );
    });

    it("should throw if carbon footprint not found", async () => {
      await expect(carbonFootprintsService.findOneById(1)).rejects.toThrow(
        new NotFoundException("No carbon footprint found for id 1")
      );
    });
  });

  describe("computeCarbonFootprint", () => {
    it("should compute and save a carbon footprint", async () => {
      const computeC02eEmissionSpy = jest.spyOn(
        C02eEmissionsCalculatorService,
        "computeC02eEmission"
      );

      const hamCheesePizza: Recipe = hamCheesePizzaFactory();
      const carbonEmissionFactors: CarbonEmissionFactor[] =
        carbonEmissionFactorsFactory();

      await recipeRepository.save(hamCheesePizza);
      await carbonEmissionFactorRepository.save(carbonEmissionFactors);

      const carbonFootprint: CarbonFootprint =
        await carbonFootprintsService.computeCarbonFootprint(
          hamCheesePizza.id,
          CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
        );

      expect(carbonFootprint.recipe).toEqual(hamCheesePizza);
      expect(carbonFootprint.source).toBe(
        CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
      );
      expect(carbonFootprint.emissionCO2eInKgPerUnit).toBe(0.224);

      expect((await carbonFootprintRepository.find()).length).toBe(1);
      expect(computeC02eEmissionSpy).toHaveBeenCalled();
    });

    it("should directly return a carbon footprint if already existing", async () => {
      const computeC02eEmissionSpy = jest.spyOn(
        C02eEmissionsCalculatorService,
        "computeC02eEmission"
      );

      const hamCheesePizzaCarbonFootprint: CarbonFootprint =
        hamCheesePizzaCarbonFootprintFactory();

      await recipeRepository.save(hamCheesePizzaCarbonFootprint.recipe);
      await carbonFootprintRepository.save(hamCheesePizzaCarbonFootprint);

      const computedCarbonFootprint: CarbonFootprint =
        await carbonFootprintsService.computeCarbonFootprint(
          hamCheesePizzaCarbonFootprint.recipe.id,
          CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
        );

      expect(computedCarbonFootprint.id).toEqual(
        hamCheesePizzaCarbonFootprint.id
      );
      expect(computeC02eEmissionSpy).not.toHaveBeenCalled();
    });
  });
});
