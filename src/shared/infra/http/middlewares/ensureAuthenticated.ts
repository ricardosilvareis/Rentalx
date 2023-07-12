/* eslint-disable prettier/prettier */
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'



interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "941ba9c3fc8c79336f53daf5f40b2105") as IPayload

        const usersRepository = new UsersRepository()
        const user = usersRepository.findById(user_id)

        if (!user) {
            throw new AppError("User not found", 401)
        }

        request.user = {
            id: user_id
        }

        next()
    } catch {
        throw new AppError("Invalid token", 401)
    }

}
