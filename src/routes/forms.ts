import { Request, Response, Router } from "express";
import { body, param, query } from "express-validator";
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

        const { name, phone, message } = req.body

        try {
            const formCreated = await prisma.forms.create({
                data: {
                    name,
                    phone,
                    message
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

formsRouter.get("/:id",
    param("id").isUUID(),
    validateCamps,
    validateLogin("crud-forms"),
    async (req: Request, res: Response) => {

        const { id } = req.params

        try {

            const form = await prisma.forms.findUnique({
                where: {
                    id: id
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

formsRouter.put("/",
    body("id").isUUID(),
    body("name").isString().optional(),
    body("phone").isMobilePhone("any").optional(),
    body("message").isString().optional(),
    validateCamps,
    validateLogin("crud-forms"),
    async(req: Request, res: Response) => {

        try {

            const { id, name, phone, message } = req.body

            const form = await prisma.forms.findUnique({
                where: {
                    id,
                }
            })

            if(!form) return res.status(404).json({
                error: FORMS_HELPER.CONTACT_DONT_EXISTS
            })

            const updatedForm = await prisma.forms.update({
                where: {
                    id
                },
                data: {
                    name,
                    phone,
                    message
                }
            })

            res.json(updatedForm)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
        
    }
)

formsRouter.delete("/:id", 
    param("id").isUUID(),
    validateCamps,
    validateLogin("crud-forms"),
    async (req: Request, res: Response) => {

        try {

            const { id } = req.params;

            const form = await prisma.forms.findUnique({
                where: {
                    id,
                }
            })

            if(!form) return res.status(404).json({
                error: FORMS_HELPER.CONTACT_DONT_EXISTS
            })

            const deletedForm = await prisma.forms.delete({
                where: {
                    id
                }
            })

            res.json(deletedForm)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

export default formsRouter;