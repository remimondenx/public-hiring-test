import { IsEnum, IsNumber, Min } from "class-validator";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../../shared/enum/unit";

export class CreateCarbonEmissionFactorDto {
  name: string;

  @IsEnum(UNIT)
  unit: UNIT;

  @IsNumber()
  @Min(0)
  emissionCO2eInKgPerUnit: number;

  @IsEnum(CARBON_EMISSION_FACTOR_SOURCE)
  source: CARBON_EMISSION_FACTOR_SOURCE;
}
