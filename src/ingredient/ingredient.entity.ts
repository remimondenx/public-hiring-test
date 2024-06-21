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
