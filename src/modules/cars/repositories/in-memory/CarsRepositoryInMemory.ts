
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

class CarsRepositoryInMemory implements ICarsRepository{
   
    cars:Car[] = [];

  async create({name, description, license_plate, fine_amount, daily_rate, category_id, brand}: ICreateCarDTO): Promise<Car> {
       const car = new Car()

       Object.assign(car, {
        name, description, license_plate, fine_amount, daily_rate, category_id, brand
       })

       this.cars.push(car);

       return car
    }

    async findByLicencePlate(license_plate: string): Promise<Car> {
        return this.cars.find(cars => cars.license_plate === license_plate)
    }

}

export {CarsRepositoryInMemory}