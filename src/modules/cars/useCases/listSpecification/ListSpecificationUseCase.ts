
import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository) {}

  async execute(): Promise<Specification[]> {
    const specification = await this.specificationRepository.list();

    return specification;
  }
}

export { ListSpecificationUseCase };
