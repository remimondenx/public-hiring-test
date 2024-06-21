import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateIngredientDto } from "./dto/create-ingredient.dto";
import { Ingredient } from "./ingredient.entity";

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientRepository.find();
  }

  saveAll(ingredientDtos: CreateIngredientDto[]): Promise<Ingredient[] | null> {
    return this.ingredientRepository.save(ingredientDtos);
  }
}
