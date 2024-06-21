import { Recipe } from "../../recipe/recipe.entity";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";

export class CreateCarbonFootprintDto {
  recipe: Recipe;
  source: CARBON_EMISSION_FACTOR_SOURCE;
  emissionCO2eInKgPerUnit: number;
}
