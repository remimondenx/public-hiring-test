import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../../shared/enum/unit";
import { OLIVE_OIL_EMISSION_FACTOR } from "./carbonEmissionFactor.constants";

describe("CarbonEmissionFactor.Entity", () => {
  describe("constructor", () => {
    it("should create a carbon emission factor", () => {
      expect(OLIVE_OIL_EMISSION_FACTOR.name).toBe("oliveOil");
      expect(OLIVE_OIL_EMISSION_FACTOR.unit).toBe(UNIT.KG);
      expect(OLIVE_OIL_EMISSION_FACTOR.emissionCO2eInKgPerUnit).toBe(0.15);
      expect(OLIVE_OIL_EMISSION_FACTOR.source).toBe(
        CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
      );
    });
  });
});
