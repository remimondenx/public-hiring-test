import { Injectable } from "@nestjs/common";
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

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  saveAll(recipeDtos: CreateRecipeDto[]): Promise<Recipe[] | null> {
    return this.recipeRepository.save(recipeDtos);
  }
}
