import { Repository } from "typeorm";
import { dataSource } from "../config/dataSource";
import { CarbonEmissionFactor } from "../src/carbonEmissionFactor/carbonEmissionFactor.entity";
import { CARBON_EMISSION_FACTORS } from "../src/carbonEmissionFactor/test/carbonEmissionFactor.constants";
import { Recipe } from "../src/recipe/recipe.entity";
import { RECIPES } from "../src/recipe/test/recipe.constants";

const seedDatabase = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const carbonEmissionFactorRepository: Repository<CarbonEmissionFactor> =
    dataSource.getRepository(CarbonEmissionFactor);
  await carbonEmissionFactorRepository.save(CARBON_EMISSION_FACTORS);

  const recipeRepository: Repository<Recipe> = dataSource.getRepository(Recipe);
  await recipeRepository.save(RECIPES);
};

if (require.main === module) {
  seedDatabase().catch((e) => console.error(e));
}
