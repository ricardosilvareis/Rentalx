import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Repository, getRepository } from "typeorm";

class CarsRepository implements ICarsRepository{

    private repository: Repository<Car>

    constructor(){
        this.repository = getRepository(Car)
    }

    async create({name, description, license_plate, fine_amount, daily_rate, category_id, brand}: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, description, license_plate, fine_amount, daily_rate, category_id, brand
        })

        this.repository.save(car)

        return car
    }
    async findByLicencePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({license_plate})

        return car
    }

}

export {CarsRepository}