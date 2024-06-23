import {
  HAM,
  HAM_CHEESE_PIZZA_INGREDIENTS,
} from "../../ingredient/test/ingredient.constants";
import { Recipe } from "../recipe.entity";
import { HAM_CHEESE_PIZZA } from "./recipe.constants";

describe("Recipe.Entity", () => {
  describe("constructor", () => {
    it("should create a recipe", () => {
      expect(HAM_CHEESE_PIZZA.name).toBe("hamCheesePizza");
      expect(HAM_CHEESE_PIZZA.ingredients).toBe(HAM_CHEESE_PIZZA_INGREDIENTS);
    });
  });

  describe("sanitize", () => {
    it("should not throw when ingredients is provided", () => {
      const recipe: Recipe = new Recipe({
        name: "ham",
        ingredients: [HAM],
      });

      expect(() => recipe.sanitize()).not.toThrow();
    });

    it("should throw when recipe has no ingredient", () => {
      const recipe: Recipe = new Recipe({
        name: "ham",
        ingredients: [],
      });

      expect(() => recipe.sanitize()).toThrow(
        new Error("The recipe should contain at least one ingredient")
      );
    });
  });
});
