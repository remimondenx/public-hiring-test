import { INGREDIENTS } from "../../ingredient/test/ingredient.constants";
import { Recipe } from "../recipe.entity";

export const HAM_CHEESE_PIZZA = new Recipe({
  name: "hamCheesePizza",
  ingredients: INGREDIENTS,
});

export const RECIPES = [HAM_CHEESE_PIZZA];
