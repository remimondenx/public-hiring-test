import { Repository } from "typeorm";
import { GreenlyDataSource, dataSource } from "../../../config/dataSource";
import { UNIT } from "../../shared/enum/unit";
import { Ingredient } from "../ingredient.entity";
import { IngredientsService } from "../ingredients.service";
import { CHEESE, HAM } from "./ingredient.constants";

let ingredientsService: IngredientsService;
let ingredientRepository: Repository<Ingredient>;

beforeAll(async () => {
  await dataSource.initialize();

  ingredientsService = new IngredientsService(
    dataSource.getRepository(Ingredient)
  );
  ingredientRepository = await dataSource.getRepository(Ingredient);
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});

describe("Ingredients.service", () => {
  it("should save new ingredients", async () => {
    await ingredientsService.saveAll([HAM, CHEESE]);

    const retrievedHam: Ingredient | null = await ingredientRepository.findOne({
      where: { name: "ham" },
    });
    expect(retrievedHam?.name).toBe("ham");
    expect(retrievedHam?.unit).toBe(UNIT.KG);
    expect(retrievedHam?.quantity).toBe(0.1);
  });

  it("should retrieve ingredients", async () => {
    let ingredients: Ingredient[] = await ingredientsService.findAll();
    expect(ingredients).toHaveLength(0);

    await ingredientRepository.save(HAM);

    ingredients = await ingredientsService.findAll();
    expect(ingredients).toHaveLength(1);
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
