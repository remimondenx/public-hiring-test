import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { Recipe } from "./recipe.entity";
import { RecipesService } from "./recipes.service";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getRecipes(): Promise<Recipe[]> {
    Logger.log(`[recipes] [GET] Recipes: getting all Recipes`);

    return this.recipesService.findAll();
  }

  @Post()
  async createRecipes(
    @Body() recipeDtos: CreateRecipeDto[]
  ): Promise<Recipe[] | null> {
    const recipes: Recipe[] | null =
      await this.recipesService.saveAll(recipeDtos);
    Logger.log(`[recipes] [POST] Recipes: ${recipes} created`);

    return recipes;
  }
}
