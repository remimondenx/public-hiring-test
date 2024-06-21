import { Repository } from "typeorm";
import { GreenlyDataSource, dataSource } from "../../../config/dataSource";
import { Ingredient } from "../../ingredient/ingredient.entity";
import { HAM, INGREDIENTS } from "../../ingredient/test/ingredient.constants";
import { UNIT } from "../../shared/enum/unit";
import { Recipe } from "../recipe.entity";
import { RecipesService } from "../recipes.service";
import { HAM_CHEESE_PIZZA } from "./recipe.constants";

let recipesService: RecipesService;
let recipeRepository: Repository<Recipe>;
let ingredientRepository: Repository<Ingredient>;

beforeAll(async () => {
  await dataSource.initialize();

  recipesService = new RecipesService(dataSource.getRepository(Recipe));
  recipeRepository = await dataSource.getRepository(Recipe);
  ingredientRepository = await dataSource.getRepository(Ingredient);
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});

describe("Recipes.service", () => {
  it("should save new recipes with ingredients", async () => {
    await recipesService.saveAll([HAM_CHEESE_PIZZA]);

    const retrievedHam: Ingredient | null = await ingredientRepository.findOne({
      where: { name: "ham" },
    });
    expect(retrievedHam?.name).toBe("ham");
    expect(retrievedHam?.unit).toBe(UNIT.KG);
    expect(retrievedHam?.quantity).toBe(0.1);

    const retrievedHamCheesePizza: Recipe | null =
      await recipeRepository.findOne({
        where: { name: "hamCheesePizza" },
        relations: ["ingredients"],
      });
    expect(retrievedHamCheesePizza?.name).toBe("hamCheesePizza");
    expect(retrievedHamCheesePizza?.ingredients).toEqual(INGREDIENTS);
  });

  it("should retrieve recipes", async () => {
    let recipes: Recipe[] = await recipesService.findAll();
    expect(recipes).toHaveLength(0);

    await recipeRepository.save(HAM);

    recipes = await recipesService.findAll();
    expect(recipes).toHaveLength(1);
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
