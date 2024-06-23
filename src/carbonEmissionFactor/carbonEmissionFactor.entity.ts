import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../shared/enum/unit";

@Entity("carbon_emission_factors")
export class CarbonEmissionFactor extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: "Id",
  })
  id: number;

  @Column({
    nullable: false,
  })
  @ApiProperty({
    example: "oliveOil",
    description: "Name",
  })
  name: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: UNIT,
  })
  @ApiProperty({
    example: "kg",
    enum: UNIT,
    description: "Quantity unit",
  })
  unit: UNIT;

  @Column({
    type: "float",
    nullable: false,
  })
  @ApiProperty({
    example: 0.2,
    description: "CO2e emission in kg per unit",
  })
  emissionCO2eInKgPerUnit: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: CARBON_EMISSION_FACTOR_SOURCE,
  })
  @ApiProperty({
    example: "Agrybalise",
    enum: CARBON_EMISSION_FACTOR_SOURCE,
    description: "Source used to compute carbon footprint",
  })
  source: CARBON_EMISSION_FACTOR_SOURCE;

  constructor(props: {
    name: string;
    unit: UNIT;
    emissionCO2eInKgPerUnit: number;
    source: CARBON_EMISSION_FACTOR_SOURCE;
  }) {
    super();

    this.name = props?.name;
    this.unit = props?.unit;
    this.emissionCO2eInKgPerUnit = props?.emissionCO2eInKgPerUnit;
    this.source = props?.source;
  }
}
