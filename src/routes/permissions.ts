import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import prisma from "../db/prisma";
import { SHARED_HELPER } from "../helper/shared";
import { validateCamps } from "../lib/validate-camps";
import { validateLogin } from "../lib/validate-login";
import { PERMISSION_HELPER } from "../helper/permission";

const permissionRouter = Router();

permissionRouter.post("/",
    body("name").isString(),
    body("description").isString(),

    validateCamps,
    validateLogin("crud-permission"),
    async (req: Request, res: Response) => {

        const { name, description } = req.body;

        try {
            const permission = await prisma.permission.create({
                data: {
                    name,
                    description
                }
            })

            res.json(permission)
        } catch(e) {
            
            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
    }
)

permissionRouter.get("/all", 
    validateLogin("crud-permission"),
    async (req: Request, res: Response) => {

        try {

            const permissions = await prisma.permission.findMany({})

            res.json(permissions)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

permissionRouter.get("/:id",
    param("id").isUUID(),

    validateCamps,
    validateLogin("crud-permission"),
    async(req: Request, res: Response) => {


        try {

            const { id } = req.params


            const permissions = await prisma.permission.findUnique({
                where: {
                    id
                }
            })

            if(!permissions) return res.status(404).json({
                error: PERMISSION_HELPER.PERMISSION_NOT_FOUND
            })

            res.json(permissions)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

permissionRouter.put("/",
    body("id").isUUID(),
    body("name").isString(),
    body("description").isString(),
    validateCamps,
    validateLogin("crud-permission"),
    async(req: Request, res: Response) => {

        try {

            const { id, name, description } = req.body;

            const permission = await prisma.permission.findUnique({
                where: {
                    id
                }
            })

            if(!permission) return res.status(404).json({
                error: PERMISSION_HELPER.PERMISSION_NOT_FOUND
            })

            const permissionUpdated = await prisma.permission.update({
                where: {
                    id
                },
                data: {
                    name,
                    description
                }
            })

            res.json(permissionUpdated)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

permissionRouter.delete("/:id",
    param("id").isUUID(),
    validateCamps,
    validateLogin("crud-permission"),
    async (req: Request, res: Response) => {

        try {

            const { id } = req.params

            const permission = await prisma.permission.findUnique({
                where: {
                    id,
                }
            })

            if(!permission) return res.status(404).json({
                error: PERMISSION_HELPER.PERMISSION_NOT_FOUND
            })

            await prisma.permissionOnRoles.deleteMany({
                where: {
                    permission_id: id
                }
            })

            await prisma.permission.delete({
                where: {
                    id
                }
            })

            res.json(permission)


        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

export default permissionRouter;