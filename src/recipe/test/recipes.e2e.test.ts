import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { Repository } from "typeorm";
import { dataSource } from "../../../config/dataSource";
import { prepareE2eTest } from "../../shared/testUtils/prepareE2e";
import { Recipe } from "../recipe.entity";
import { hamCheesePizzaFactory } from "./recipe.constants";

let recipeRepository: Repository<Recipe>;

beforeAll(async () => {
  await dataSource.initialize();

  recipeRepository = await dataSource.getRepository(Recipe);
});

afterAll(async () => {
  await dataSource.destroy();
});

describe("Recipes.Controller", () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await prepareE2eTest(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /recipes", () => {
    it("should create recipe", async () => {
      const hamCheesePizza: Recipe = hamCheesePizzaFactory();
      await request(app.getHttpServer())
        .post("/recipes")
        .send(hamCheesePizza)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toMatchObject(hamCheesePizza);
        });

      const retrievedRecipes: Recipe[] = await recipeRepository.find({
        relations: ["ingredients"],
      });
      expect(retrievedRecipes).toHaveLength(1);
      expect(retrievedRecipes[0]).toMatchObject(hamCheesePizza);
    });

    it("should throw with invalid inputs", async () => {
      return request(app.getHttpServer())
        .post("/recipes")
        .send({
          name: "hamCheesePizza",
          ingredients: [
            {
              name: "oliveOil",
              unit: "not-a-unit",
              quantity: -1,
            },
          ],
        })
        .expect(400)
        .expect(({ body }) => {
          expect(body.message).toEqual([
            "ingredients.0.unit must be one of the following values: kg, l",
            "ingredients.0.quantity must not be less than 0",
          ]);
        });
    });
  });

  describe("GET /recipes", () => {
    it("should get recipes", async () => {
      const hamCheesePizza: Recipe = hamCheesePizzaFactory();
      await recipeRepository.save(hamCheesePizza);

      return request(app.getHttpServer())
        .get("/recipes")
        .expect(200)
        .expect(({ body }) => {
          expect(body).toEqual([hamCheesePizza]);
        });
    });
  });
});
