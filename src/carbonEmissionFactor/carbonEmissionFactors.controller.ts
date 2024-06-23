import { Body, Controller, Get, Logger, Post } from "@nestjs/common";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "./carbonEmissionFactors.service";
import { CreateCarbonEmissionFactorDto } from "./dto/create-carbonEmissionFactor.dto";

@Controller("carbon-emission-factors")
export class CarbonEmissionFactorsController {
  constructor(
    private readonly carbonEmissionFactorsService: CarbonEmissionFactorsService
  ) {}

  @Get()
  async getCarbonEmissionFactors(): Promise<CarbonEmissionFactor[]> {
    const carbonEmissionFactors: CarbonEmissionFactor[] =
      await this.carbonEmissionFactorsService.findAll();
    Logger.log(
      `[carbon-emission-factors] [GET] CarbonEmissionFactors: carbon emission factors retrieved`
    );

    return carbonEmissionFactors;
  }

  @Post()
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
