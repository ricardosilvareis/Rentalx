/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

/* eslint-disable prettier/prettier */
interface IRequest {
    email: string;
    password: string;
}


interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        // Verificar se Usuario existe

        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Email or password incorrect!")
        }

        // Verificar se a senha esta correta

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!")

        }

        // Gerar o JsonwebToken

        const token = sign({}, "941ba9c3fc8c79336f53daf5f40b2105", {
            subject: user.id,
            expiresIn: "1d"
        });

        return {
            user: {
                name: user.name,
                email: user.email,
            },
            token
        }
    }
}

export { AuthenticateUserUseCase };
