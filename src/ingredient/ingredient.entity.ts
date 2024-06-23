import { ApiProperty } from "@nestjs/swagger";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipe } from "../recipe/recipe.entity";
import { UNIT } from "../shared/enum/unit";

@Entity("ingredients")
export class Ingredient extends BaseEntity {
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
    description: "Quantity",
  })
  quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;

  constructor(props: { name: string; unit: UNIT; quantity: number }) {
    super();

    this.name = props?.name;
    this.unit = props?.unit;
    this.quantity = props?.quantity;
  }
}
