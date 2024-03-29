import {Request, Response} from "express"
import { container } from "tsyringe"
import { CreateCarUseCase } from "./CreateCarUseCase"

class CreateCarController{
    async handle(request: Request, response: Response):Promise<Response>{

        const {name, description, license_plate, fine_amount, daily_rate, category_id, brand} = request.body

        const createCarUseCase = container.resolve(CreateCarUseCase)

       const car = await createCarUseCase.execute({name, description, license_plate, fine_amount, daily_rate, category_id, brand})

       return response.status(201).json(car)
    }

}

export {CreateCarController}