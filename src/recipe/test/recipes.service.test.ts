import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { GreenlyDataSource, dataSource } from "../../../config/dataSource";
import { Ingredient } from "../../ingredient/ingredient.entity";
import { Recipe } from "../recipe.entity";
import { RecipesService } from "../recipes.service";
import { HAM_CHEESE_PIZZA, hamCheesePizzaFactory } from "./recipe.constants";

let recipesService: RecipesService;
let recipeRepository: Repository<Recipe>;
let ingredientRepository: Repository<Ingredient>;

beforeAll(async () => {
  await dataSource.initialize();

  recipeRepository = await dataSource.getRepository(Recipe);
  recipesService = new RecipesService(recipeRepository);
  ingredientRepository = await dataSource.getRepository(Ingredient);
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("Recipes.service", () => {
  describe("findAll", () => {
    it("should retrieve recipes", async () => {
      const hamCheesePizza: Recipe = hamCheesePizzaFactory();
      await recipeRepository.save(hamCheesePizza);

      const recipes: Recipe[] = await recipesService.findAll();
      expect(recipes).toHaveLength(1);
    });

    it("should throw when recipes are not found", async () => {
      expect(recipesService.findAll()).rejects.toThrow("No recipes found");
    });
  });

  describe("findOneById", () => {
    it("should correctly find one recipe by id", async () => {
      const hamCheesePizza: Recipe = hamCheesePizzaFactory();
      const savedRecipe: Recipe = await recipeRepository.save(hamCheesePizza);

      const retrievedRecipe: Recipe = await recipesService.findOneById(
        savedRecipe.id
      );

      expect(retrievedRecipe).toEqual(savedRecipe);
    });

    it("should throw when recipe does not exist", async () => {
      await expect(recipesService.findOneById(1)).rejects.toThrow(
        new NotFoundException("Recipe with id 1 not found")
      );
    });
  });

  describe("saveAll", () => {
    it("should save new recipes with ingredients", async () => {
      const hamCheesePizza: Recipe = hamCheesePizzaFactory();
      await recipesService.create(hamCheesePizza);

      const retrievedHam: Ingredient | null =
        await ingredientRepository.findOne({
          where: { name: "ham" },
        });
      expect(retrievedHam).toEqual(
        hamCheesePizza.ingredients.find(
          (ingredient) => ingredient.name === "ham"
        )
      );

      const retrievedHamCheesePizza: Recipe | null =
        await recipeRepository.findOne({
          where: { name: "hamCheesePizza" },
          relations: ["ingredients"],
        });
      expect(retrievedHamCheesePizza).toEqual(hamCheesePizza);
    });

    it("should throw if a recipe with same name already exists", async () => {
      await recipeRepository.save(HAM_CHEESE_PIZZA);

      await expect(recipesService.create(HAM_CHEESE_PIZZA)).rejects.toThrow(
        "A recipe with name hamCheesePizza already exists"
      );
    });
  });
});
