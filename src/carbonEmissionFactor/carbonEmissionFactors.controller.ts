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
  getCarbonEmissionFactors(): Promise<CarbonEmissionFactor[]> {
    Logger.log(
      `[carbon-emission-factors] [GET] CarbonEmissionFactors: getting all CarbonEmissionFactors`
    );

    return this.carbonEmissionFactorsService.findAll();
  }

  @Post()
  async createCarbonEmissionFactors(
    @Body() carbonEmissionFactorDtos: CreateCarbonEmissionFactorDto[]
  ): Promise<CarbonEmissionFactor[] | null> {
    const carbonEmissionFactors: CarbonEmissionFactor[] | null =
      await this.carbonEmissionFactorsService.saveAll(carbonEmissionFactorDtos);
    Logger.log(
      `[carbon-emission-factors] [POST] CarbonEmissionFactors: ${carbonEmissionFactors} created`
    );

    return carbonEmissionFactors;
  }
}
