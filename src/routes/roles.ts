import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { SHARED_HELPER } from "../helper/shared";
import prisma from "../db/prisma";

const rolesRouter = Router();

rolesRouter.post("/",
    body("name").isString(),
    body("description").isString(),
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

export default rolesRouter;