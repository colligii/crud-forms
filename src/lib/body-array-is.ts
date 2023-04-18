import { NextFunction, Request, Response } from "express"
import { HELPER_BODY_ARRAY } from "../helper/bodyarray";

const bodyArrayIs = (name: string, type: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(req.body[name].every((permissionId: never) => typeof(permissionId) == type)) return next();

        res.status(400).json({ error: HELPER_BODY_ARRAY.MESSAGE_ERROR })
    }
}

export default bodyArrayIs