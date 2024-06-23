import { UNIT } from "../../shared/enum/unit";
import { Ingredient } from "../ingredient.entity";

export const HAM = new Ingredient({
  name: "ham",
  unit: UNIT.KG,
  quantity: 0.1,
});

export const CHEESE = new Ingredient({
  name: "cheese",
  unit: UNIT.KG,
  quantity: 0.15,
});

export const TOMATO = new Ingredient({
  name: "tomato",
  unit: UNIT.KG,
  quantity: 0.4,
});

export const FLOUR = new Ingredient({
  name: "flour",
  unit: UNIT.KG,
  quantity: 0.7,
});

export const OLIVE_OIL = new Ingredient({
  name: "oliveOil",
  unit: UNIT.KG,
  quantity: 0.3,
});

export const HAM_CHEESE_PIZZA_INGREDIENTS = [
  HAM,
  CHEESE,
  TOMATO,
  FLOUR,
  OLIVE_OIL,
];

export const hamCheesePizzaIngredientsFactory = (): Ingredient[] =>
  HAM_CHEESE_PIZZA_INGREDIENTS.map(
    ({ name, unit, quantity }) =>
      new Ingredient({
        name,
        unit,
        quantity,
      })
  );
