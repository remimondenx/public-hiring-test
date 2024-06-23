import { Type } from "class-transformer";
import { IsEnum, IsNumber, Min, ValidateNested } from "class-validator";
import { UNIT } from "../../shared/enum/unit";

export class CreateRecipeDto {
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateIngredientDto)
  ingredients: CreateIngredientDto[];
}

export class CreateIngredientDto {
  name: string;

  @IsEnum(UNIT)
  unit: UNIT;

  @IsNumber()
  @Min(0)
  quantity: number;
}
