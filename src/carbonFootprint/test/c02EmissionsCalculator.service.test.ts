import { BadRequestException } from "@nestjs/common";
import { CarbonEmissionFactor } from "../../carbonEmissionFactor/carbonEmissionFactor.entity";
import {
  CHEESE_EMISSION_FACTOR,
  HAM_EMISSION_FACTOR,
  VINEGAR_EMISSION_FACTOR,
} from "../../carbonEmissionFactor/test/carbonEmissionFactor.constants";
import { Ingredient } from "../../ingredient/ingredient.entity";
import { CHEESE, HAM } from "../../ingredient/test/ingredient.constants";
import { UNIT } from "../../shared/enum/unit";
import { C02eEmissionsCalculatorService } from "../c02eEmissionsCalculator.service";

describe("C02EmissionsCalculator.service", () => {
  describe("computeC02eEmission", () => {
    it.each([
      {
        ingredients: [HAM, CHEESE],
        carbonEmissionFactors: [
          HAM_EMISSION_FACTOR,
          CHEESE_EMISSION_FACTOR,
          VINEGAR_EMISSION_FACTOR,
        ],
        expectedC02Emission: 0.029,
      },
      {
        ingredients: [],
        carbonEmissionFactors: [],
        expectedC02Emission: 0,
      },
    ])(
      "should compute C02 emission",
      async ({
        ingredients,
        carbonEmissionFactors,
        expectedC02Emission,
      }: {
        ingredients: Ingredient[];
        carbonEmissionFactors: CarbonEmissionFactor[];
        expectedC02Emission: number;
      }) => {
        const c02Emission: number | null =
          C02eEmissionsCalculatorService.computeC02eEmission(
            ingredients,
            carbonEmissionFactors
          );

        expect(c02Emission).toBe(expectedC02Emission);
      }
    );

    it.each([
      {
        ingredients: [HAM],
        carbonEmissionFactors: [CHEESE_EMISSION_FACTOR],
        expectedError: "Missing carbon emission factor for ingredient ham",
      },
      {
        ingredients: [HAM],
        carbonEmissionFactors: [
          {
            ...HAM_EMISSION_FACTOR,
            unit: UNIT.L,
          },
        ],
        expectedError: "Incompatible units for ingredient ham",
      },
    ])(
      "should trigger error while computing C02 emission",
      async ({
        ingredients,
        carbonEmissionFactors,
        expectedError,
      }: {
        ingredients: Ingredient[];
        carbonEmissionFactors: CarbonEmissionFactor[];
        expectedError: string;
      }) => {
        expect(() =>
          C02eEmissionsCalculatorService.computeC02eEmission(
            ingredients,
            carbonEmissionFactors
          )
        ).toThrow(new BadRequestException(expectedError));
      }
    );
  });
});
