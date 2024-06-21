import { Repository } from "typeorm";
import { dataSource, GreenlyDataSource } from "../../../config/dataSource";
import { CARBON_EMISSION_FACTOR_SOURCE } from "../../shared/enum/carbonEmissionFactorSource";
import { UNIT } from "../../shared/enum/unit";
import { CarbonEmissionFactor } from "../carbonEmissionFactor.entity";
import { CarbonEmissionFactorsService } from "../carbonEmissionFactors.service";
import {
  FLOUR_EMISSION_FACTOR,
  HAM_EMISSION_FACTOR,
} from "./carbonEmissionFactor.constants";

let carbonEmissionFactorsService: CarbonEmissionFactorsService;
let carbonEmissionFactorRepository: Repository<CarbonEmissionFactor>;

beforeAll(async () => {
  await dataSource.initialize();
  carbonEmissionFactorsService = new CarbonEmissionFactorsService(
    dataSource.getRepository(CarbonEmissionFactor)
  );
  carbonEmissionFactorRepository =
    await dataSource.getRepository(CarbonEmissionFactor);
});

beforeEach(async () => {
  await GreenlyDataSource.cleanDatabase();
});

describe("CarbonEmissionFactors.service", () => {
  it("should save new carbon emission factors", async () => {
    await carbonEmissionFactorsService.saveAll([
      HAM_EMISSION_FACTOR,
      FLOUR_EMISSION_FACTOR,
    ]);

    const retrievedHamCarbonEmissionFactor: CarbonEmissionFactor | null =
      await carbonEmissionFactorRepository.findOne({
        where: { name: "ham" },
      });
    expect(retrievedHamCarbonEmissionFactor?.name).toBe("ham");
    expect(retrievedHamCarbonEmissionFactor?.unit).toBe(UNIT.KG);
    expect(retrievedHamCarbonEmissionFactor?.emissionCO2eInKgPerUnit).toBe(
      0.11
    );
    expect(retrievedHamCarbonEmissionFactor?.source).toBe(
      CARBON_EMISSION_FACTOR_SOURCE.AGRYBALISE
    );
  });

  it("should retrieve carbon emission factors", async () => {
    let carbonEmissionFactors: CarbonEmissionFactor[] =
      await carbonEmissionFactorsService.findAll();
    expect(carbonEmissionFactors).toHaveLength(0);

    await carbonEmissionFactorRepository.save(HAM_EMISSION_FACTOR);

    carbonEmissionFactors = await carbonEmissionFactorsService.findAll();
    expect(carbonEmissionFactors).toHaveLength(1);
  });
});

afterAll(async () => {
  await dataSource.destroy();
});
