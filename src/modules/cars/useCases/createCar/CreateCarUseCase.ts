import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    name: string
    description: string
    daily_rate: number
    license_plate: string
    fine_amount: number
    brand: string
    category_id: string

}

@injectable()
class CreateCarUseCase {

    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) { }

    async execute({ name, description, license_plate, fine_amount, daily_rate, category_id, brand }: IRequest): Promise<Car> {

        const carsAlreadyExist = await this.carsRepository.findByLicencePlate(license_plate)

        if (carsAlreadyExist) {
            throw new AppError("Car already exists");

        }

        const car = await this.carsRepository.create({
            name, description, license_plate, fine_amount, daily_rate, category_id, brand
        })

        return car

    }

}

export { CreateCarUseCase }