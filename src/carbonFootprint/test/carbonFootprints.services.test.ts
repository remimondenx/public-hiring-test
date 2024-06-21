import { Repository } from "typeorm";
import { GreenlyDataSource, dataSource } from "../../../config/dataSource";
import { Recipe } from "../../recipe/recipe.entity";
import { HAM_CHEESE_PIZZA } from "../../recipe/test/recipe.constants";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { CarbonFootprint } from "../carbonFootprint.entity";
import { CarbonFootprintsService } from "../carbonFootprints.service";
import { HAM_CHEESE_PIZZA_CARBON_FOOTPRINT } from "./carbonFootprint.constants";

let carbonFootprintsService: CarbonFootprintsService;
let carbonFootprintRepository: Repository<CarbonFootprint>;
let recipeRepository: Repository<Recipe>;

beforeAll(async () => {
  await dataSource.initialize();

  carbonFootprintsService = new CarbonFootprintsService(
    dataSource.getRepository(CarbonFootprint)
  );
  carbonFootprintRepository = await dataSource.getRepository(CarbonFootprint);
  recipeRepository = await dataSource.getRepository(Recipe);
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});

describe("CarbonFootprints.service", () => {
  it("should save new carbonFootprints", async () => {
    await recipeRepository.save(HAM_CHEESE_PIZZA);
    await carbonFootprintsService.saveAll([HAM_CHEESE_PIZZA_CARBON_FOOTPRINT]);

    const retrievedHamCheesePizzaCarbonFootprint: CarbonFootprint | null =
      await carbonFootprintRepository.findOne({
        where: { recipe: HAM_CHEESE_PIZZA },
        relations: ["recipe", "recipe.ingredients"],
      });
    expect(retrievedHamCheesePizzaCarbonFootprint?.recipe).toEqual(
      HAM_CHEESE_PIZZA
    );
    expect(retrievedHamCheesePizzaCarbonFootprint?.source).toBe(
      CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
    );
    expect(
      retrievedHamCheesePizzaCarbonFootprint?.emissionCO2eInKgPerUnit
    ).toBe(0.224);
  });

  it("should retrieve carbonFootprints", async () => {
    let carbonFootprints: CarbonFootprint[] =
      await carbonFootprintsService.findAll();
    expect(carbonFootprints).toHaveLength(0);

    await recipeRepository.save(HAM_CHEESE_PIZZA);
    await carbonFootprintRepository.save(HAM_CHEESE_PIZZA_CARBON_FOOTPRINT);

    carbonFootprints = await carbonFootprintsService.findAll();
    expect(carbonFootprints).toHaveLength(1);
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
