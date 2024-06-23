import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, Min } from "class-validator";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../../shared/enum/unit";

export class CreateCarbonEmissionFactorDto {
  @ApiProperty({
    example: "oliveOil",
    description: "Ingredient name",
  })
  name: string;

  @ApiProperty({
    example: "kg",
    enum: UNIT,
    description: "Quantity unit",
  })
  @IsEnum(UNIT)
  unit: UNIT;

  @ApiProperty({
    example: 0.2,
    description: "CO2e emission in kg per unit",
  })
  @IsNumber()
  @Min(0)
  emissionCO2eInKgPerUnit: number;

  @ApiProperty({
    example: "Agrybalise",
    enum: CARBON_EMISSION_FACTOR_SOURCE,
    description: "Source used to compute carbon footprint",
  })
  @IsEnum(CARBON_EMISSION_FACTOR_SOURCE)
  source: CARBON_EMISSION_FACTOR_SOURCE;
}
