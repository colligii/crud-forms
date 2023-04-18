import { Request, Response, Router } from "express";
import { body } from "express-validator";
import bcrypt from "bcrypt"
import prisma from "../db/prisma";

const userRouter = Router();

userRouter.post("/",
    body("email").isEmail(),
    body("password").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/),
    async (req: Request, res: Response) => {

        try {
            const encryptedPassword = await bcrypt.hash(req.body.password, 12);

            const user = await prisma.user.create({
                data: {
                    ...req.body,
                    password: encryptedPassword
                }
            })

            res.json(user)
        } catch(e) {
            res.status(500).json({ error: e })
        }
    }
)

export default userRouter;