import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../../shared/enum/unit";

export class CreateCarbonEmissionFactorDto {
  name: string;
  unit: UNIT;
  emissionCO2eInKgPerUnit: number;
  source: CARBON_EMISSION_FACTOR_SOURCE;
}
