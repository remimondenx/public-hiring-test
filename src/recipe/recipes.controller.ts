import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { Recipe } from "./recipe.entity";
import { RecipesService } from "./recipes.service";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  async getRecipes(): Promise<Recipe[]> {
    const recipes: Recipe[] = await this.recipesService.findAll();

    Logger.log(`[recipes] [GET] Recipes: recipes retrieved`);

    return recipes;
  }

  @Post()
  async createRecipe(
    @Body() recipeDto: CreateRecipeDto
  ): Promise<Recipe | null> {
    const recipe: Recipe | null = await this.recipesService.create(recipeDto);
    Logger.log(`[recipes] [POST] Recipe: recipe created`);

    return recipe;
  }
}
