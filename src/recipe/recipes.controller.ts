import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { Recipe } from "./recipe.entity";
import { RecipesService } from "./recipes.service";

@Controller("recipes")
@ApiTags("Recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: "Get all recipes" })
  @ApiResponse({
    status: 200,
    description: "Recipes returned",
    type: [Recipe],
  })
  @ApiResponse({ status: 404, description: "No recipes found" })
  async getRecipes(): Promise<Recipe[]> {
    const recipes: Recipe[] = await this.recipesService.findAll();

    Logger.log(`[recipes] [GET] Recipes: recipes retrieved`);

    return recipes;
  }

  @Post()
  @ApiOperation({ summary: "Create a recipe" })
  @ApiResponse({
    status: 201,
    description: "Recipe created",
    type: Recipe,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async createRecipe(
    @Body() recipeDto: CreateRecipeDto
  ): Promise<Recipe | null> {
    const recipe: Recipe | null = await this.recipesService.create(recipeDto);
    Logger.log(`[recipes] [POST] Recipe: recipe created`);

    return recipe;
  }
}
