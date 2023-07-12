import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { AppError } from "@shared/errors/AppError"


let authenticateUserUseCase: AuthenticateUserUseCase
let userRepositoryInMemory:  UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
        createUserUseCase= new CreateUserUseCase(userRepositoryInMemory)

    })

    it('should be able to authenticate a an user',async () => {
        const user: ICreateUserDTO = {
            driver_license:'000123',
            email: 'user@example.com',
            password:'1234',
            name:'John',

        }

        await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    } )  

    it('should not be able to authenticate an not existent user',async () => {
        expect(async() =>{
            await authenticateUserUseCase.execute({
                email: 'ricardo@email.com.br',
                password: '1234'
            })
        }).rejects.toBeInstanceOf(AppError)
    } )  


    it('should not be able to authenticate with incorret password',async () => {
        expect(async() =>{
            const user: ICreateUserDTO = {
                driver_license:'9999',
                email: 'user@user.com',
                password:'1234',
                name:'Teste',
    
            }

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: user.email,
                password: '123'
            })

        }).rejects.toBeInstanceOf(AppError)
    } )  
})