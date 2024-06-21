import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../shared/enum/unit";

@Entity("carbon_emission_factors")
export class CarbonEmissionFactor extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: UNIT,
  })
  unit: UNIT;

  @Column({
    type: "float",
    nullable: false,
  })
  emissionCO2eInKgPerUnit: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: CARBON_EMISSION_FACTOR_SOURCE,
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
