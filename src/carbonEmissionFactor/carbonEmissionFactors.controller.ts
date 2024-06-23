import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "./carbonEmissionFactors.service";
import { CreateCarbonEmissionFactorDto } from "./dto/create-carbonEmissionFactor.dto";

@Controller("carbon-emission-factors")
@ApiTags("Carbon emission factors")
export class CarbonEmissionFactorsController {
  constructor(
    private readonly carbonEmissionFactorsService: CarbonEmissionFactorsService
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all carbon emission factors" })
  @ApiResponse({
    status: 200,
    description: "Carbon emission factors returned",
    type: [CarbonEmissionFactor],
  })
  @ApiResponse({ status: 404, description: "No carbon emission factors found" })
  async getCarbonEmissionFactors(): Promise<CarbonEmissionFactor[]> {
    const carbonEmissionFactors: CarbonEmissionFactor[] =
      await this.carbonEmissionFactorsService.findAll();
    Logger.log(
      `[carbon-emission-factors] [GET] CarbonEmissionFactors: carbon emission factors retrieved`
    );

    return carbonEmissionFactors;
  }

  @Post()
  @ApiOperation({ summary: "Create a carbon emission factor" })
  @ApiResponse({
    status: 201,
    description: "Carbon emission factors created",
    type: CarbonEmissionFactor,
  })
  @ApiResponse({ status: 400, description: "Invalid input" })
  async createCarbonEmissionFactor(
    @Body() carbonEmissionFactorDto: CreateCarbonEmissionFactorDto
  ): Promise<CarbonEmissionFactor | null> {
    const carbonEmissionFactor: CarbonEmissionFactor | null =
      await this.carbonEmissionFactorsService.create(carbonEmissionFactorDto);
    Logger.log(
      `[carbon-emission-factors] [POST] CarbonEmissionFactor: carbon emission factor created`
    );

    return carbonEmissionFactor;
  }
}
