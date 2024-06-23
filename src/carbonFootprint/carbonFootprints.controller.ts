import { Controller, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { CarbonFootprint } from "./carbonFootprint.entity";
import { CarbonFootprintsService } from "./carbonFootprints.service";
import { CreateCarbonFootprintDto } from "./dto/create-carbonFootprint.dto";
import { GetCarbonFootprintDto } from "./dto/get-carbonFootprint.dto";

@Controller("carbon-footprints")
export class CarbonFootprintsController {
  constructor(
    private readonly carbonFootprintsService: CarbonFootprintsService
  ) {}

  @Get()
  async getCarbonFootprints(): Promise<CarbonFootprint[]> {
    const carbonFootprints: CarbonFootprint[] =
      await this.carbonFootprintsService.findAll();

    Logger.log(
      `[carbon-footprints] [GET] CarbonFootprints: carbon footprints retrieved`
    );

    return carbonFootprints;
  }

  @Get("/:id")
  async getCarbonFootprint(
    @Param() { id }: GetCarbonFootprintDto
  ): Promise<CarbonFootprint> {
    const carbonFootprint: CarbonFootprint =
      await this.carbonFootprintsService.findOneById(id);

    Logger.log(
      `[carbon-footprints] [GET] CarbonFootprint: carbon footprint retrieved`
    );

    return carbonFootprint;
  }

  @Post()
  async createCarbonFootprints(
    @Query() { recipeId, source }: CreateCarbonFootprintDto
  ): Promise<CarbonFootprint> {
    const carbonFootprint: CarbonFootprint =
      await this.carbonFootprintsService.computeCarbonFootprint(
        recipeId,
        source
      );

    Logger.log(
      `[carbon-footprints] [POST] CarbonFootprints: carbon footprint computed`
    );

    return carbonFootprint;
  }
}
