import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonEmissionFactorsModule } from "../carbonEmissionFactor/carbonEmissionFactors.module";
import { RecipesModule } from "../recipe/recipes.module";
import { CarbonFootprint } from "./carbonFootprint.entity";
import { CarbonFootprintsController } from "./carbonFootprints.controller";
import { CarbonFootprintsService } from "./carbonFootprints.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([CarbonFootprint]),
    CarbonEmissionFactorsModule,
    RecipesModule,
  ],
  providers: [CarbonFootprintsService],
  controllers: [CarbonFootprintsController],
})
export class CarbonFootprintsModule {}
