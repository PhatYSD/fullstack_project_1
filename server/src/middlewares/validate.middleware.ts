import { RequestHandler, Request, Response, NextFunction } from "express";
import { validationResult, ValidationError, Result } from "express-validator";
import createHttpError from "http-errors";

const validation: RequestHandler = (req: Request, _res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        throw next(createHttpError(400, { message: errors.array() }));
    }

    next();
};

export default validation;