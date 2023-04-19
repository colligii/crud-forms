import { Request, Response, Router } from "express";
import { body } from "express-validator";
import prisma from "../db/prisma";
import { LOGIN_HELPER } from "../helper/login";
import bcrypt from "bcrypt";
import { SHARED_HELPER } from "../helper/shared";
import jwt from "jsonwebtoken"
import { validateCamps } from "../lib/validate-camps";

const loginRouter = Router();

loginRouter.post("/",
    body("email").isEmail(),
    body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    validateCamps,
    async (req: Request, res: Response) => {
        
        try {

            const user = await prisma.user.findFirst({
                where: {
                    email: req.body.email,
                    active: true
                }
            })

            if(!user) return res.status(401).json({ error: LOGIN_HELPER.ERROR_ON_LOGIN })
        
            const password = await bcrypt.compare(req.body.password, user.password);
            
            if(!password) return res.status(401).json({ error: LOGIN_HELPER.ERROR_ON_LOGIN })

            const token = await jwt.sign({ email: user.email }, process.env.SECRET ?? "")

            res.cookie("auth", token, { httpOnly: true })

            res.json({ token })

        } catch(e) {
        
            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }
    

    } 
)

export default loginRouter