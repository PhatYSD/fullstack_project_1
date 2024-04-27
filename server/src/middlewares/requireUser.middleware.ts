import { RequestHandler, Response, NextFunction } from "express";
import createHttpError from "http-errors";

import { RequestUser } from "./token.middleware";

const requireUser: RequestHandler = (req: RequestUser, _res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            throw createHttpError(403, "Forbidden - No access rights.")
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default requireUser;