import {
  HAM_CHEESE_PIZZA,
  hamCheesePizzaFactory,
} from "../../recipe/test/recipe.constants";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { CarbonFootprint } from "../carbonFootprint.entity";

export const HAM_CHEESE_PIZZA_CARBON_FOOTPRINT = new CarbonFootprint({
  recipe: HAM_CHEESE_PIZZA,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
  emissionCO2eInKgPerUnit: 0.224,
});

export const CARBON_FOOTPRINTS = [HAM_CHEESE_PIZZA_CARBON_FOOTPRINT];

export const hamCheesePizzaCarbonFootprintFactory = (): CarbonFootprint =>
  new CarbonFootprint({
    recipe: hamCheesePizzaFactory(),
    source: HAM_CHEESE_PIZZA_CARBON_FOOTPRINT.source,
    emissionCO2eInKgPerUnit:
      HAM_CHEESE_PIZZA_CARBON_FOOTPRINT.emissionCO2eInKgPerUnit,
  });
