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

        const { permissions_id , role_id } = req.body;
    
        try {

            const permissionOnRoles = generatePermissionOnRoles(permissions_id, role_id);

            const permissionOnRolesSelect = await Promise.all(
                permissionOnRoles.map(permissiononrole => {
                    return prisma.permissionOnRoles.findUnique({
                        where: {
                            role_id_permission_id: {
                                permission_id: permissiononrole.permission_id,
                                role_id: permissiononrole.role_id
                            }
                        }
                    })
                })
            )

            if(!permissionOnRolesSelect.every(permissiononrole => permissiononrole == undefined ||permissiononrole == null)) return res.status(409).json({
                error: PERMISSION_ON_ROLE_HELPER.CONNECTION_CONFLICTS
            })

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

permissionOnRolesRouter.post("/disconnect", 
    body("role_id").isString(),
    body("permissions_id").isArray(),
    bodyArrayIs("permissions_id", "string"),

    validateCamps,
    validateLogin("crud-permission-on-role"),
    async (req: Request, res: Response) => {

        const { permissions_id , role_id } = req.body;
    
        try {

            const permissionOnRolesAray = generatePermissionOnRoles(permissions_id, role_id);


            const permissionOnRolesSelect = await Promise.all(
                permissionOnRolesAray.map(permissiononrole => {
                    return prisma.permissionOnRoles.findUnique({
                        where: {
                            role_id_permission_id: {
                                permission_id: permissiononrole.permission_id,
                                role_id: permissiononrole.role_id
                            }
                        }
                    })
                })
            )

            if(permissionOnRolesSelect.some(permissiononrole => permissiononrole == undefined ||permissiononrole == null)) return res.status(404).json({
                error: PERMISSION_ON_ROLE_HELPER.NOT_EXISTS
            })

            const permissionOnRolePromiseArray = permissionOnRolesAray.map((permissiononrole) => {

                return prisma.permissionOnRoles.deleteMany({
                    where: permissiononrole
                })
            })

            await Promise.all(permissionOnRolePromiseArray)

            res.json({ message: PERMISSION_ON_ROLE_HELPER.DELETED_WITH_SUCESS })

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

export default permissionOnRolesRouter;