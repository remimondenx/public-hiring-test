import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty({
    example: 1,
    description: "Id",
  })
  id: number;

  @Column({
    nullable: false,
  })
  @ApiProperty({
    example: "hamCheesePizza",
    description: "Name",
  })
  name: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    cascade: true,
  })
  @ApiProperty({
    type: [Ingredient],
    description: "Recipe ingredients",
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
