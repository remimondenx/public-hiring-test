import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "../recipe/recipe.entity";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../shared/enum/carbonEmissionFactorSource";

@Entity("carbon_footprints")
export class CarbonFootprint extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.carbonFootprints)
  recipe: Recipe;

  @Column({
    nullable: false,
    type: "enum",
    enum: CARBON_EMISSION_FACTOR_SOURCE,
  })
  source: CARBON_EMISSION_FACTOR_SOURCE;

  @Column({
    type: "float",
  })
  emissionCO2eInKgPerUnit: number;

  constructor(props: {
    source: CARBON_EMISSION_FACTOR_SOURCE;
    emissionCO2eInKgPerUnit: number;
    recipe: Recipe;
  }) {
    super();

    this.source = props?.source;
    this.emissionCO2eInKgPerUnit = props?.emissionCO2eInKgPerUnit;
    this.recipe = props?.recipe;
  }
}
