import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class GetCarbonFootprintDto {
  @ApiProperty({
    example: 1,
    description: "Carbon footprint id",
  })
  @IsInt()
  id: number;
}
