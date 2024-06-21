import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarbonFootprint } from "./carbonFootprint.entity";
import { CarbonFootprintsService } from "./carbonFootprints.service";

@Module({
  imports: [TypeOrmModule.forFeature([CarbonFootprint])],
  providers: [CarbonFootprintsService],
})
export class CarbonFootprintsModule {}
