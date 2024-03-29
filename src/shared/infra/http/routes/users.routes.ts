/* eslint-disable no-use-before-define */
import { Router } from "express";

import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const usersRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))


usersRouter.post("/", createUserController.handle);

usersRouter.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export { usersRouter };
