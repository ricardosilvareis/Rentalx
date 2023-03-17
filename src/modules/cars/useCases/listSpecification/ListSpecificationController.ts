import { Response, Request } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationController {
  constructor(private listspecificationUseCase: ListSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const all = this.listspecificationUseCase.execute();

    return response.json(all);
  }
}

export { ListSpecificationController };
