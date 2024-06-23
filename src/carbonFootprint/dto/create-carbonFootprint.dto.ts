import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt } from "class-validator";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";

export class CreateCarbonFootprintDto {
  @ApiProperty({
    example: 1,
    description: "Recipe id",
  })
  @IsInt()
  recipeId: number;

  @ApiProperty({
    example: "Agrybalise",
    enum: CARBON_EMISSION_FACTOR_SOURCE,
    description: "Source used to compute carbon footprint",
  })
  @IsEnum(CARBON_EMISSION_FACTOR_SOURCE)
  source: CARBON_EMISSION_FACTOR_SOURCE;
}
