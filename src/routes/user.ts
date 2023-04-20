import { Request, Response, Router } from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt"
import prisma from "../db/prisma";
import { SHARED_HELPER } from "../helper/shared";
import { validateCamps } from "../lib/validate-camps";
import { ROLE_HELPER } from "../helper/role";
import generateCode from "../lib/generate-code";
import { USER_HELPER } from "../helper/user";
import { validateLogin } from "../lib/validate-login";
import emailQueue from "../lib/email-queue";
import { LOGIN_HELPER } from "../helper/login";
import { USER_ACTIVATED_HELPER } from "../helper/user-activated";

const userRouter = Router();

userRouter.post("/",
    body("email").isEmail(),
    body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    body("role_id").isUUID(),
    validateCamps,
    validateLogin("crud-user"),
    async (req: Request, res: Response) => {

        try {

            const role = await prisma.role.findUnique({
                where: {
                    id: req.body.role_id
                }
            })
            
            if(!role) return res.status(422).json({
                error: ROLE_HELPER.THIS_ROLE_IS_NOT_EXIST
            })

            const userSearch = await prisma.user.findUnique({
                where: {
                    email: req.body.email
                }
            })

            if(userSearch) return res.status(422).json({
                error: USER_HELPER.USER_EXISTS
            })


            const encryptedPassword = await bcrypt.hash(req.body.password, 12);
            const user = await prisma.user.create({
                data: {
                    activation_code: generateCode(),
                    ...req.body,
                    password: encryptedPassword
                },
                select: {
                    id: true,
                    email: true,

                }
            })
            emailQueue.add({ email: user.email })

            res.json(user)
        } catch(e:any) {
            res.status(500).json({ error: e })
        }
    }
)




userRouter.get("/all", 

    validateLogin("crud-user"),
    async (req: Request, res: Response) => {
        try {


            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    email: true,
                    updated_at: true,
                    active: true,

                }
            })

            res.json(users);
            
        } catch(e) {
            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
    }
)

userRouter.post("/active",
    body("email").isEmail(),
    body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    body("activation_code").matches(/[A-Z]{6,6}/),
    validateCamps,
    async (req: Request, res: Response) => {
        
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: req.body.email,
                    active: false,
                    activation_code: req.body.activation_code
                }
            })

            if(!user) return res.status(401).json({ error: LOGIN_HELPER.ERROR_ON_LOGIN })
        
            const password = await bcrypt.compare(req.body.password, user.password);
            
            if(!password) return res.status(401).json({ error: LOGIN_HELPER.ERROR_ON_LOGIN })

            await prisma.user.update({
                where: {
                    email: req.body.email
                },
                data: {
                    activation_code: null,
                    active: true
                }
            })


            res.json({ message: USER_ACTIVATED_HELPER.MAKE_IT })

        } catch(e) {
        
            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
    

    } 
)

export default userRouter;