import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationRoutes } from "./specification.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specification", specificationRoutes);
router.use("/users", usersRouter);
router.use(authenticateRoutes);

export { router };
