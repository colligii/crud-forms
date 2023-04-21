import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
import { SHARED_HELPER } from "../helper/shared";
import prisma from "../db/prisma";
import { validateCamps } from "../lib/validate-camps";
import { validateLogin } from "../lib/validate-login";
import { ROLE_HELPER } from "../helper/role";

const rolesRouter = Router();

rolesRouter.post("/",
    body("name").isString(),
    body("description").isString(),
    validateCamps,
    validateLogin("crud-role"),
    async (req: Request, res: Response) => {

        const { name, description } = req.body;

        try {
            const role = await prisma.role.create({
                data: {
                    name,
                    description
                }
            })

            res.json(role)
        } catch(e) {
            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
    }

)

    rolesRouter.put("/",
        body("id").isUUID(),
        body("name").isString().optional(),
        body("description").isString().optional(),
        validateCamps,
        validateLogin("crud-role"),
        async (req: Request, res: Response) => {

            const { id, name, description } = req.body;

            try {

                const roles = await prisma.role.findUnique({
                    where: {
                        id: id
                    }
                })

                if(!roles) return res.status(404).json({ error: ROLE_HELPER.THIS_ROLE_IS_NOT_EXIST })

                await prisma.role.update({
                    where: {
                        id: id
                    },
                    data: {
                        id: id,
                        name: name,
                        description: description
                    }
                })

                res.json({ message: ROLE_HELPER.UPDATE_WITH_SUCCESS })

            } catch(e) {

                const errorMessage = SHARED_HELPER.ERROR;
                console.log(errorMessage)
                console.log(e);
                res.status(500).json({ error: errorMessage })
            }

        }
    )

    rolesRouter.delete("/:id",
        param("id").isUUID(),
        validateCamps,
        validateLogin("crud-role"),
        async (req: Request, res: Response) => {

            const { id } = req.params;

            try {

                const roles = await prisma.role.findUnique({
                    where: {
                        id: id
                    }
                })

                if(!roles) return res.status(404).json({ error: ROLE_HELPER.THIS_ROLE_IS_NOT_EXIST })

                await prisma.permissionOnRoles.deleteMany({
                    where: {
                        role_id: id
                    }
                })

                await prisma.role.delete({
                    where: {
                        id: id
                    }
                })

                res.json({ message: ROLE_HELPER.DELETED_WITH_SUCCESS })

            } catch(e) {

                const errorMessage = SHARED_HELPER.ERROR;
                console.log(errorMessage)
                console.log(e);
                res.status(500).json({ error: errorMessage })
            }

        }
    )

rolesRouter.get("/all", 
    validateLogin("crud-role"),
    async (req: Request, res: Response) => {

        try {

            const roles = await prisma.role.findMany({})

            res.json(roles)
        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
    
    }
)

rolesRouter.get("/:id",
    param("id").isUUID(),
    validateCamps,
    validateLogin("crud-role"),
    async (req: Request, res: Response) => {

        try {

            const { id } = req.params;

            const role = await prisma.role.findUnique({
                where: {
                    id
                }
            })

            if(!role) return res.status(404).json({
                error: ROLE_HELPER.NOT_FOUND
            })

            res.json( role )

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
    }

)


export default rolesRouter;