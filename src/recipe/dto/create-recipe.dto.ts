import { Ingredient } from "../../ingredient/ingredient.entity";

export class CreateRecipeDto {
  name: string;
  ingredients: Ingredient[];
}
