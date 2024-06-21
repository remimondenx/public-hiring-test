import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarbonFootprint } from "./carbonFootprint.entity";
import { CreateCarbonFootprintDto } from "./dto/create-carbonFootprint.dto";

@Injectable()
export class CarbonFootprintsService {
  constructor(
    @InjectRepository(CarbonFootprint)
    private carbonFootprintRepository: Repository<CarbonFootprint>
  ) {}

  findAll(): Promise<CarbonFootprint[]> {
    return this.carbonFootprintRepository.find();
  }

  saveAll(
    carbonFootprintDtos: CreateCarbonFootprintDto[]
  ): Promise<CarbonFootprint[] | null> {
    return this.carbonFootprintRepository.save(carbonFootprintDtos);
  }
}
