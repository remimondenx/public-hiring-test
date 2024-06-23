import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarbonEmissionFactorsService } from "../carbonEmissionFactor/carbonEmissionFactors.service";
import { Recipe } from "../recipe/recipe.entity";
import { RecipesService } from "../recipe/recipes.service";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../shared/enum/carbonEmissionFactorSource";
import { C02eEmissionsCalculatorService } from "./c02eEmissionsCalculator.service";
import { CarbonFootprint } from "./carbonFootprint.entity";

@Injectable()
export class CarbonFootprintsService {
  constructor(
    @InjectRepository(CarbonFootprint)
    private carbonFootprintRepository: Repository<CarbonFootprint>,
    private carbonEmissionFactorsService: CarbonEmissionFactorsService,
    private recipesService: RecipesService
  ) {}

  async findAll(): Promise<CarbonFootprint[]> {
    const carbonFootprints: CarbonFootprint[] =
      await this.carbonFootprintRepository.find({ relations: ["recipe"] });

    if (carbonFootprints.length === 0) {
      throw new NotFoundException("No carbon footprints found");
    }

    return carbonFootprints;
  }

  async findOneById(id: number): Promise<CarbonFootprint> {
    const carbonFootprint: CarbonFootprint | null =
      await this.carbonFootprintRepository.findOne({
        where: { id },
        relations: ["recipe"],
      });

    if (!carbonFootprint) {
      throw new NotFoundException(`No carbon footprint found for id ${id}`);
    }

    return carbonFootprint;
  }

  async computeCarbonFootprint(
    recipeId: number,
    source: CARBON_EMISSION_FACTOR_SOURCE
  ): Promise<CarbonFootprint> {
    const recipe: Recipe = await this.recipesService.findOneById(recipeId);
    const existingCarbonFootprint: CarbonFootprint | null =
      await this.carbonFootprintRepository.findOne({
        where: {
          recipe,
          source,
        },
        relations: ["recipe"],
      });

    if (existingCarbonFootprint != null) {
      return existingCarbonFootprint;
    }

    const ingredientNames: string[] = recipe.ingredients.map(
      (ingredient) => ingredient.name
    );

    const carbonFootprintFactors =
      await this.carbonEmissionFactorsService.findAllByIngredientsAndSource(
        ingredientNames,
        source
      );

    const c02Emission: number =
      C02eEmissionsCalculatorService.computeC02eEmission(
        recipe.ingredients,
        carbonFootprintFactors
      );

    const carbonFootprint: CarbonFootprint =
      await this.carbonFootprintRepository.save(
        new CarbonFootprint({
          recipe,
          source,
          emissionCO2eInKgPerUnit: c02Emission,
        })
      );

    return carbonFootprint;
  }
}
