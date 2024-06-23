import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { Recipe } from "./recipe.entity";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>
  ) {}

  async findAll(): Promise<Recipe[]> {
    const recipes: Recipe[] = await this.recipeRepository.find({
      relations: ["ingredients"],
    });

    if (recipes.length === 0) {
      throw new NotFoundException("No recipes found");
    }

    return recipes;
  }

  async findOneById(id: number): Promise<Recipe> {
    const recipe: Recipe | null = await this.recipeRepository.findOne({
      where: { id },
      relations: ["ingredients"],
    });

    if (!recipe) {
      throw new NotFoundException(`Recipe with id ${id} not found`);
    }

    return recipe;
  }

  async create(recipeDto: CreateRecipeDto): Promise<Recipe | null> {
    const existingRecipe: Recipe | null = await this.recipeRepository.findOneBy(
      {
        name: recipeDto.name,
      }
    );

    if (existingRecipe != null) {
      throw new BadRequestException(
        `A recipe with name ${recipeDto.name} already exists`
      );
    }
    return this.recipeRepository.save(recipeDto);
  }
}
