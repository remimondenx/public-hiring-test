import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CarbonFootprint } from "../carbonFootprint/carbonFootprint.entity";
import { Ingredient } from "../ingredient/ingredient.entity";

@Entity("recipes")
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
  })
  ingredients: Ingredient[];

  @OneToMany(() => CarbonFootprint, (carbonFootprint) => carbonFootprint.recipe)
  carbonFootprints: CarbonFootprint[];

  @BeforeInsert()
  sanitize() {
    if (this.ingredients.length === 0) {
      throw new Error("The recipe should contain at least one ingredient");
    }
  }

  constructor(props: { name: string; ingredients: Ingredient[] }) {
    super();

    this.name = props?.name;
    this.ingredients = props?.ingredients;
  }
}
