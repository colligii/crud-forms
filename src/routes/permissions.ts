import { Request, Response, Router } from "express";
import { body } from "express-validator";
import prisma from "../db/prisma";
import { SHARED_HELPER } from "../helper/shared";

const permissionRouter = Router();

permissionRouter.post("/",
    body("name").isString(),
    body("description").isString(),
    async (req: Request, res: Response) => {
        try {
            const permission = await prisma.permission.create({
                data: req.body
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