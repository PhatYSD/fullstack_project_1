import { Prisma } from "@prisma/client";
import { isHttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";

const handleError = (error: unknown, _req: Request, res: Response, _next: NextFunction) => {
    console.log(error);

    let statusError: number = 500;
    let messageError: string = "Internal Server Error.";

    if (isHttpError(error)) {
        statusError = error.statusCode;
        messageError = error.message;
    }
    else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            statusError = 409;
            messageError = `Conflict - Duplicate data found: ${error.meta?.target}`;
        }
        else if (error.code === "P2025") {
            statusError = 404;
            messageError = `Not Found - ${error.message}.`;
        }
        else if (error.code === "P2021") {
            statusError = 404;
            messageError = `Not Found - The table does not exist in the current database: ${error.meta?.target}`;
        }
        else /* Prisma Unknow Error */ {
            console.log(error.code);
            messageError = `Prisma Error - ${error.message}`;
        }
    }
    else if (error instanceof Prisma.PrismaClientValidationError) /* Prisma Validate Error */ {
        statusError = 400;
        messageError = `Bad Request - Invalid value in request.`;
    }
    else if (error instanceof Error) {
        messageError = error.message ?? messageError;
    }

    res.status(statusError).json({ message: messageError });
};

export default handleError;