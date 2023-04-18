import { Request, Response, Router } from "express"
import { body } from "express-validator";
import bodyArrayIs from "../lib/body-array-is";
import { SHARED_HELPER } from "../helper/shared";
import prisma from "../db/prisma";
import generatePermissionOnRoles from "../lib/generatePermissionOnRoles";

const permissionOnRolesRouter = Router();

permissionOnRolesRouter.post("/connect", 
    body("role_id").isString(),
    body("permissions_id").isArray(),
    bodyArrayIs("permissions_id", "string"),
    async (req: Request, res: Response) => {

        try {

            const permissionOnRoles = generatePermissionOnRoles(req.body.permissions_id, req.body.role_id);

            const permissionOnRolesData = await prisma.permissionOnRoles.createMany({
                data: permissionOnRoles
            })

            res.json(permissionOnRolesData)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

export default permissionOnRolesRouter;