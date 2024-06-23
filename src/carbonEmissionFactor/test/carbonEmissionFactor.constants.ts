import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../../shared/enum/unit";
import { CarbonEmissionFactor } from "../carbonEmissionFactor.entity";

export const HAM_EMISSION_FACTOR = new CarbonEmissionFactor({
  name: "ham",
  unit: UNIT.KG,
  emissionCO2eInKgPerUnit: 0.11,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
});

export const CHEESE_EMISSION_FACTOR = new CarbonEmissionFactor({
  name: "cheese",
  unit: UNIT.KG,
  emissionCO2eInKgPerUnit: 0.12,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
});

export const TOMATO_EMISSION_FACTOR = new CarbonEmissionFactor({
  name: "tomato",
  unit: UNIT.KG,
  emissionCO2eInKgPerUnit: 0.13,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
});

export const FLOUR_EMISSION_FACTOR = new CarbonEmissionFactor({
  name: "flour",
  unit: UNIT.KG,
  emissionCO2eInKgPerUnit: 0.14,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
});

export const VINEGAR_EMISSION_FACTOR = new CarbonEmissionFactor({
  name: "vinegar",
  unit: UNIT.KG,
  emissionCO2eInKgPerUnit: 0.34,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
});

export const OLIVE_OIL_EMISSION_FACTOR = new CarbonEmissionFactor({
  name: "oliveOil",
  unit: UNIT.KG,
  emissionCO2eInKgPerUnit: 0.15,
  source: CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE,
});

export const CARBON_EMISSION_FACTORS = [
  HAM_EMISSION_FACTOR,
  CHEESE_EMISSION_FACTOR,
  TOMATO_EMISSION_FACTOR,
  FLOUR_EMISSION_FACTOR,
  VINEGAR_EMISSION_FACTOR,
  OLIVE_OIL_EMISSION_FACTOR,
];

export const carbonEmissionFactorsFactory = (): CarbonEmissionFactor[] =>
  CARBON_EMISSION_FACTORS.map(
    ({ name, unit, emissionCO2eInKgPerUnit, source }) =>
      new CarbonEmissionFactor({
        name,
        unit,
        emissionCO2eInKgPerUnit,
        source,
      })
  );
