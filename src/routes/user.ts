import { Request, Response, Router } from "express";
import { body, param } from "express-validator";
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

        const { email, password, role_id } = req.body;

        try {

            const role = await prisma.role.findUnique({
                where: {
                    id: role_id
                }
            })
            
            if(!role) return res.status(422).json({
                error: ROLE_HELPER.THIS_ROLE_IS_NOT_EXIST
            })

            const userSearch = await prisma.user.findUnique({
                where: {
                    email: email
                }
            })

            if(userSearch) return res.status(422).json({
                error: USER_HELPER.USER_EXISTS
            })


            const encryptedPassword = await bcrypt.hash(password, 12);
            const user = await prisma.user.create({
                data: {
                    activation_code: generateCode(),
                    email,
                    role_id,
                    password: encryptedPassword
                },
                select: {
                    id: true,
                    email: true,

                }
            })
            emailQueue.add({ email: user.email })

            res.json(user)
        } catch(e) {
            
            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
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

        const { email, password, activation_code } = req.body 
        
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: email,
                    active: false,
                    activation_code: activation_code
                }
            })

            if(!user) return res.status(401).json({ error: LOGIN_HELPER.ERROR_ON_LOGIN })
        
            const passwordValidation = await bcrypt.compare(password, user.password);
            
            if(!passwordValidation) return res.status(401).json({ error: LOGIN_HELPER.ERROR_ON_LOGIN })

            await prisma.user.update({
                where: {
                    email: email
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

userRouter.post("/again-code", 
    body("id").isUUID(),
    validateLogin("crud-user"),
    validateCamps,
    async (req: Request, res: Response) => {

        const { id } = req.body;
        
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                    active: false
                }
            })
    
            if(!user) return res.status(400).json({ error: USER_HELPER.USER_NOT_EXISTS })
    
            emailQueue.add({ email: user.email })
            
            res.json({ message: USER_HELPER.SENDED_AGAIN })
        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

userRouter.delete("/:id",
    param("id").isUUID(),
    validateCamps,
    async(req: Request, res: Response) => {

        const { id } = req.params;

        try {

            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                    active: true
                },
                select: {
                    id: true,
                    email: true
                }
            })

            if(!user) return res.status(404).json({ error: USER_HELPER.USER_NOT_EXISTS })

            await prisma.user.delete({
                where: {
                    id: id
                }
            })

            res.json(user)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

userRouter.put("/", 
    body("id").isUUID(),
    body("email").isEmail().optional(),
    body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/).optional(),
    body("role_id").isUUID().optional(),
    validateCamps,
    validateLogin("crud-user"),
    async(req: Request, res: Response) => {

        const { id, email, password, role_id } = req.body

        let active, activation_code;

        try {

            const user = await prisma.user.findFirst({
                where: {
                    id: id,
                    active: true
                }
            })

            if(!user) res.status(404).json({ error: USER_HELPER.USER_NOT_EXISTS })

            if(email) {
                active = false;
                activation_code = generateCode()


                emailQueue.add({ email: email })
            }
            
            const updatedUser = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    active,
                    activation_code,
                    email,
                    password,
                    role_id
                },
                select: {
                    id: true,
                    created_date: true,
                    email: true,
                }
            })

            res.json(updatedUser)

        } catch(e) {

            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
)

export default userRouter;