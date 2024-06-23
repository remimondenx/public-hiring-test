import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../shared/enum/carbonEmissionFactorSource";
import { CarbonEmissionFactor } from "./carbonEmissionFactor.entity";
import { CreateCarbonEmissionFactorDto } from "./dto/create-carbonEmissionFactor.dto";

@Injectable()
export class CarbonEmissionFactorsService {
  constructor(
    @InjectRepository(CarbonEmissionFactor)
    private carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>
  ) {}

  async findAll(): Promise<CarbonEmissionFactor[]> {
    const carbonEmissionFactors: CarbonEmissionFactor[] =
      await this.carbonEmissionFactorRepository.find();

    if (carbonEmissionFactors.length === 0) {
      throw new NotFoundException("No carbon emission factors found");
    }

    return carbonEmissionFactors;
  }

  async findAllByIngredientsAndSource(
    ingredientNames: string[],
    source: CARBON_EMISSION_FACTOR_SOURCE
  ): Promise<CarbonEmissionFactor[]> {
    const carbonEmissionFactors: CarbonEmissionFactor[] =
      await this.carbonEmissionFactorRepository.find({
        where: { name: In(ingredientNames), source },
      });

    if (carbonEmissionFactors.length < ingredientNames.length) {
      throw new BadRequestException(
        `Only ${carbonEmissionFactors.length} carbon emission factor(s) found for source ${source}, ${ingredientNames.length} expected`
      );
    }

    return carbonEmissionFactors;
  }

  async create(
    carbonEmissionFactorDto: CreateCarbonEmissionFactorDto
  ): Promise<CarbonEmissionFactor | null> {
    const existingCarbonEmissionFactor: CarbonEmissionFactor | null =
      await this.carbonEmissionFactorRepository.findOneBy({
        name: carbonEmissionFactorDto.name,
        source: carbonEmissionFactorDto.source,
      });

    if (existingCarbonEmissionFactor != null) {
      throw new BadRequestException(
        `An emission factor with name ${carbonEmissionFactorDto.name} and source ${carbonEmissionFactorDto.source} already exists`
      );
    }
    return this.carbonEmissionFactorRepository.save(carbonEmissionFactorDto);
  }
}
