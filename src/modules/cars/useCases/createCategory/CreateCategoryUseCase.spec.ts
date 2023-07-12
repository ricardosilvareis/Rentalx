import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory"
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"
import { AppError } from "@shared/errors/AppError"


let createCategoryUseCase: CreateCategoryUseCase
let createCategoryInMemory: CategoriesRepositoryInMemory

describe("Create Category", () => {

    beforeEach(() => {
        createCategoryInMemory = new CategoriesRepositoryInMemory()
        createCategoryUseCase = new CreateCategoryUseCase(createCategoryInMemory)
    })


    it("Should be able to create a new category", async () => {
        const category = {
            name: 'CreateCategory',
            description: 'Create a new category'
        }

        await createCategoryUseCase.execute(category)

        const categoryCreate = await createCategoryInMemory.findByName(category.name)

        expect(categoryCreate).toHaveProperty
            ("id")
    })

    it("Should not be able to create a new category with same name", async () => {
        expect(async ()=>{
            const category = {
                name: 'CreateCategory',
                description: 'Create a new category'
            }
    
            await createCategoryUseCase.execute(category)
    
            await createCategoryUseCase.execute(category)

        }).rejects.toBeInstanceOf(AppError)

    })
})