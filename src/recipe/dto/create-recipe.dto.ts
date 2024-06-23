import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, Min, ValidateNested } from "class-validator";
import { UNIT } from "../../shared/enum/unit";

export class CreateIngredientDto {
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
    description: "Quantity",
  })
  @IsNumber()
  @Min(0)
  quantity: number;
}

export class CreateRecipeDto {
  @ApiProperty({
    example: "hamCheesePizza",
    description: "Recipe name",
  })
  name: string;

  @ApiProperty({
    type: [CreateIngredientDto],
    description: "Recipe ingredients",
  })
  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];
}
