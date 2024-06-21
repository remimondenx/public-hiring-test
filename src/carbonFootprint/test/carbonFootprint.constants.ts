import { HAM_CHEESE_PIZZA } from "../../recipe/test/recipe.constants";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { CarbonFootprint } from "../carbonFootprint.entity";

export const HAM_CHEESE_PIZZA_CARBON_FOOTPRINT = new CarbonFootprint({
  recipe: HAM_CHEESE_PIZZA,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
  emissionCO2eInKgPerUnit: 0.224,
});

export const CARBON_FOOTPRINTS = [HAM_CHEESE_PIZZA_CARBON_FOOTPRINT];
