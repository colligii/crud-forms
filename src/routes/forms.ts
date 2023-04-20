import { Request, Response, Router } from "express";
import { body, query } from "express-validator";
import { validateCamps } from "../lib/validate-camps";
import prisma from "../db/prisma";
import { SHARED_HELPER } from "../helper/shared";
import { validateLogin } from "../lib/validate-login";
import { FORMS_HELPER } from "../helper/forms";

const formsRouter = Router();

formsRouter.post("/",
    body("name").isString(),
    body("phone").isMobilePhone("any"),
    body("message").isString(),
    validateCamps,
    async (req: Request, res: Response) => {

        try {
            const formCreated = await prisma.forms.create({
                data: {
                    ...req.body
                }
            })
    
            res.json(formCreated)    
        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

formsRouter.get("/",
    query("id").isUUID(),
    validateCamps,
    async (req: Request, res: Response) => {

        try {

            const form = await prisma.forms.findUnique({
                where: {
                    id: req.params.id
                }
            })

            if(!form) return res.status(404).json({
                error: FORMS_HELPER.CONTACT_DONT_EXISTS
            })

            res.json(form)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    })

formsRouter.get("/all", 
    query("page").isNumeric(),
    validateLogin("crud-forms"),
    async(req: Request, res: Response) => {

        try {

            const forms = await prisma.forms.findMany({
                skip: +(req.query.page ?? 0)*10,
                take: 10
            })

            res.json(forms)
        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

export default formsRouter;