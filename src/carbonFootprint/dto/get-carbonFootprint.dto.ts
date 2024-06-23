import { IsInt } from "class-validator";

export class GetCarbonFootprintDto {
  @IsInt()
  id: number;
}
