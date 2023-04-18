import { Router } from "express";
import userRouter from "./routes/user";
import permissionRouter from "./routes/permissions";
import rolesRouter from "./routes/roles";
import permissionOnRolesRouter from "./routes/permission_on_roles";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/roles", rolesRouter);
routes.use("/permission", permissionRouter);
routes.use("/permission-on-role", permissionOnRolesRouter)

export default routes;