/* eslint-disable no-use-before-define */
import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRouter = Router();

usersRouter.post("/", createUserController.handle);

usersRouter.patch("/avatar", updateUserAvatarController.handle);

export { usersRouter };
