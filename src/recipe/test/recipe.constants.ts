import {
  HAM_CHEESE_PIZZA_INGREDIENTS,
  hamCheesePizzaIngredientsFactory,
} from "../../ingredient/test/ingredient.constants";
import { Recipe } from "../recipe.entity";

export const HAM_CHEESE_PIZZA = new Recipe({
  name: "hamCheesePizza",
  ingredients: HAM_CHEESE_PIZZA_INGREDIENTS,
});

export const RECIPES = [HAM_CHEESE_PIZZA];

export const hamCheesePizzaFactory = (): Recipe =>
  new Recipe({
    name: HAM_CHEESE_PIZZA.name,
    ingredients: hamCheesePizzaIngredientsFactory(),
  });
