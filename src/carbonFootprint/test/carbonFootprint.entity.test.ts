import { HAM_CHEESE_PIZZA } from "../../recipe/test/recipe.constants";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { HAM_CHEESE_PIZZA_CARBON_FOOTPRINT } from "./carbonFootprint.constants";

describe("CarbonFootprint.Entity", () => {
  describe("constructor", () => {
    it("should create a carbon footprint", () => {
      expect(HAM_CHEESE_PIZZA_CARBON_FOOTPRINT.recipe).toBe(HAM_CHEESE_PIZZA);
      expect(HAM_CHEESE_PIZZA_CARBON_FOOTPRINT.source).toBe(
        CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
      );
      expect(HAM_CHEESE_PIZZA_CARBON_FOOTPRINT.emissionCO2eInKgPerUnit).toBe(
        0.224
      );
    });
  });
});
