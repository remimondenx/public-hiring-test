import { INGREDIENTS } from "../../ingredient/test/ingredient.constants";
import { HAM_CHEESE_PIZZA } from "./recipe.constants";

describe("Recipe.Entity", () => {
  describe("constructor", () => {
    it("should create a recipe", () => {
      expect(HAM_CHEESE_PIZZA.name).toBe("hamCheesePizza");
      expect(HAM_CHEESE_PIZZA.ingredients).toBe(INGREDIENTS);
    });
  });
});
