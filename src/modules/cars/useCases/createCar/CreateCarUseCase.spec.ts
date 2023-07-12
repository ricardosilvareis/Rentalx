import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarUseCase } from "./CreateCarUseCase"
import { AppError } from "@shared/errors/AppError"

let createCarUseCase: CreateCarUseCase
let cartRepositoryInMemory: CarsRepositoryInMemory

describe('Creat a Car', ()=>{

    beforeEach(()=>{
        cartRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(cartRepositoryInMemory)
    })

    it('should be able to createa new car',async ()=>{
        const car = await createCarUseCase.execute({
            name:"Cars", description:"Teste Cars", license_plate:"ACV-2229", fine_amount:60, daily_rate:100, category_id:"category", brand:"brand"
        })

        expect(car).toHaveProperty("id")
    })

    it('should not be able to create a car with exist license plate',async ()=>{
       expect(async ()=>{
        await createCarUseCase.execute({
            name:"Cars 1", 
            description:"Teste Cars",
             license_plate:"ACV-2229", 
             fine_amount:60, 
             daily_rate:100,
            category_id:"category",
             brand:"brand"
        })

        await createCarUseCase.execute({
            name:"Cars 2", 
            description:"Teste Cars",
             license_plate:"ACV-2229", 
             fine_amount:60, 
             daily_rate:100,
            category_id:"category",
             brand:"brand"
        })
       }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a car with available true by default',async ()=>{
        const car = await createCarUseCase.execute({
            name:"Cars Available", 
            description:"Teste Cars",
             license_plate:"ACV-4229", 
             fine_amount:60, 
             daily_rate:100,
            category_id:"category",
             brand:"brand"
        })

        expect(car.available).toBe(true);
     })
})