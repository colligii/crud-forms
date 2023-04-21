import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import prisma from "../db/prisma"
import { TOKEN_HELPER } from "../helper/token"
import { SHARED_HELPER } from "../helper/shared"

export const validateLogin = (permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        

        try {

            const token = req.cookies?.auth ?? req.headers?.authorization

            if(!token) return res.status(401).json({ error: TOKEN_HELPER.ERROR_MESSAGE })

            const decodedToken = await jwt.verify(token, process.env.SECRET ?? "") as DecodedToken;

            const user = await prisma.user.findFirst({
                where: {
                    email: decodedToken.email,
                    active: true,
                    role: {
                        permissions: {
                            some: {
                                permission: {
                                    name: permission
                                }
                            }
                        }
                    }
                }
            })

            if(user) return next()
            console.log(decodedToken)
            res.status(401).json({ error: TOKEN_HELPER.ERROR_MESSAGE })

        } catch(e) {

        
            const errorMessage = SHARED_HELPER.ERROR;
            console.log(errorMessage)
            console.log(e);
            res.status(500).json({ error: errorMessage })
        }

    }
}

interface DecodedToken {
    email: string
}