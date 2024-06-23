import { Controller, Get, Logger, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarbonFootprint } from "./carbonFootprint.entity";
import { CarbonFootprintsService } from "./carbonFootprints.service";
import { CreateCarbonFootprintDto } from "./dto/create-carbonFootprint.dto";
import { GetCarbonFootprintDto } from "./dto/get-carbonFootprint.dto";

@Controller("carbon-footprints")
@ApiTags("Carbon footprints")
export class CarbonFootprintsController {
  constructor(
    private readonly carbonFootprintsService: CarbonFootprintsService
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all carbon footprints" })
  @ApiResponse({
    status: 200,
    description: "Carbon footprints returned",
    type: [CarbonFootprint],
  })
  @ApiResponse({ status: 404, description: "No carbon footprints found" })
  async getCarbonFootprints(): Promise<CarbonFootprint[]> {
    const carbonFootprints: CarbonFootprint[] =
      await this.carbonFootprintsService.findAll();

    Logger.log(
      `[carbon-footprints] [GET] CarbonFootprints: carbon footprints retrieved`
    );

    return carbonFootprints;
  }

  @Get("/:id")
  @ApiOperation({ summary: "Get a carbon footprint by id" })
  @ApiResponse({
    status: 200,
    description: "Carbon footprint returned",
    type: CarbonFootprint,
  })
  @ApiResponse({
    status: 404,
    description: "No carbon footprint found for the id provided",
  })
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
  @ApiOperation({ summary: "Compute a carbon footprint" })
  @ApiResponse({
    status: 201,
    description: "Carbon footprint computed",
    type: CarbonFootprint,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  @ApiResponse({ status: 404, description: "Associated recipe not found" })
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
