import { BadRequestException, Injectable } from "@nestjs/common";
import { CarbonEmissionFactor } from "../carbonEmissionFactor/carbonEmissionFactor.entity";
import { Ingredient } from "../ingredient/ingredient.entity";

@Injectable()
export class C02eEmissionsCalculatorService {
  static computeC02eEmission(
    ingredients: Ingredient[],
    carbonEmissionFactors: CarbonEmissionFactor[]
  ): number {
    const carbonEmissionFactorsMap: Map<string, CarbonEmissionFactor> =
      this.transformCarbonEmissionFactorsToMap(carbonEmissionFactors);
    let c02eEmission: number = 0;

    for (let ingredient of ingredients) {
      const associatedCarbonEmissionFactor: CarbonEmissionFactor | undefined =
        carbonEmissionFactorsMap.get(ingredient.name);

      if (!associatedCarbonEmissionFactor) {
        throw new BadRequestException(
          `Missing carbon emission factor for ingredient ${ingredient.name}`
        );
      }

      if (ingredient.unit !== associatedCarbonEmissionFactor.unit) {
        throw new BadRequestException(
          `Incompatible units for ingredient ${ingredient.name}`
        );
      }

      c02eEmission +=
        ingredient.quantity *
        associatedCarbonEmissionFactor.emissionCO2eInKgPerUnit;
    }

    return parseFloat(c02eEmission.toFixed(3));
  }

  private static transformCarbonEmissionFactorsToMap(
    carbonEmissionFactors: CarbonEmissionFactor[]
  ): Map<string, CarbonEmissionFactor> {
    const carbonEmissionFactorsMap = new Map<string, CarbonEmissionFactor>();

    for (let carbonEmissionFactor of carbonEmissionFactors) {
      carbonEmissionFactorsMap.set(
        carbonEmissionFactor.name,
        carbonEmissionFactor
      );
    }

    return carbonEmissionFactorsMap;
  }
}
