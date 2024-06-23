import { IsEnum, IsInt } from "class-validator";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";

export class CreateCarbonFootprintDto {
  @IsInt()
  recipeId: number;

  @IsEnum(CARBON_EMISSION_FACTOR_SOURCE)
  source: CARBON_EMISSION_FACTOR_SOURCE;
}
