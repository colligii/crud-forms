import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { SHARED_HELPER } from "../helper/shared";
import prisma from "../db/prisma";
import { validateCamps } from "../lib/validate-camps";
import { validateLogin } from "../lib/validate-login";

const rolesRouter = Router();

rolesRouter.post("/",
    body("name").isString(),
    body("description").isString(),
    validateCamps,
    validateLogin("crud-role"),
    async (req: Request, res: Response) => {
        try {
            const role = await prisma.role.create({
                data: {
                    ...req.body
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

rolesRouter.get("/all", 
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


export default rolesRouter;