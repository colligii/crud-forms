import { Request, Response, Router } from "express"
import { body } from "express-validator";
import bodyArrayIs from "../lib/body-array-is";
import { SHARED_HELPER } from "../helper/shared";
import prisma from "../db/prisma";
import generatePermissionOnRoles from "../lib/generatePermissionOnRoles";
import PERMISSION_ON_ROLE_HELPER from "../helper/permissiononrole";
import { validateCamps } from "../lib/validate-camps";
import { validateLogin } from "../lib/validate-login";

const permissionOnRolesRouter = Router();

permissionOnRolesRouter.post("/connect", 
    body("role_id").isString(),
    body("permissions_id").isArray(),
    bodyArrayIs("permissions_id", "string"),

    validateCamps,
    validateLogin("crud-permission-on-role"),
    async (req: Request, res: Response) => {

        
    
        try {

            const permissionOnRoles = generatePermissionOnRoles(req.body.permissions_id, req.body.role_id);

            await prisma.permissionOnRoles.createMany({
                data: permissionOnRoles
            })

            res.json({ message: PERMISSION_ON_ROLE_HELPER.SUCCESS_MESSAGE })

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

export default permissionOnRolesRouter;