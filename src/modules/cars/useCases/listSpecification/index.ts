import { SpecificationRepository } from "../../infra/typeorm/repositories/SpecificationRepository";
import { ListSpecificationController } from "./ListSpecificationController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

const specificationRepository = null;

const listspecificationUseCase = new ListSpecificationUseCase(
  specificationRepository
);

const listSpecificationController = new ListSpecificationController(
  listspecificationUseCase
);

export { listSpecificationController };
