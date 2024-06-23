import { UNIT } from "../../shared/enum/unit";
import { OLIVE_OIL } from "./ingredient.constants";

describe("Ingredient.Entity", () => {
  describe("constructor", () => {
    it("should create an ingredient", () => {
      expect(OLIVE_OIL.name).toBe("oliveOil");
      expect(OLIVE_OIL.unit).toBe(UNIT.KG);
      expect(OLIVE_OIL.quantity).toBe(0.3);
    });
  });
});
