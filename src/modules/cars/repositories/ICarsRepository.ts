import { ICreateCarDTO } from "../dtos/ICreateCarDTO"
import { Car } from "../infra/typeorm/entities/Car"

interface ICarsRepository{
    create({name, description, license_plate, fine_amount, daily_rate, category_id, brand}: ICreateCarDTO):Promise<Car>
    findByLicencePlate(license_plate:string):Promise<Car>
}

export {ICarsRepository}