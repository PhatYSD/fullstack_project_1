import { RequestHandler, Request, Response, NextFunction } from "express";

import { VerifyAccess, VerifyRefresh, signAccess, verifyAccess, verifyRefresh } from "../utils/jwt.util";
import prisma from "../utils/prisma.util";

export interface RequestUser extends Request {
    user?: {
        id: string;
        username: string;
    }
}

const token: RequestHandler = async (req: RequestUser, res: Response, next: NextFunction) => {
    const refreshVerify: VerifyRefresh = verifyRefresh(req.cookies.refreshToken as string);
    const accessVerify: VerifyAccess = verifyAccess(req.cookies.accessToken as string);

    if (!refreshVerify.status) {
        return next();
    }

    try {
        if (accessVerify.status) {
            const id: string = accessVerify.payload?.id as string;
            const username: string = accessVerify.payload?.username as string;

            await prisma.user.findUniqueOrThrow({
                where: {
                    id
                }
            });
    
            req.user = {
                id, 
                username
            };
    
            return next();
        }

        const username: string = refreshVerify.payload?.username as string;
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                username
            },
            select: {
                id: true
            }
        });

        res.cookie("accessToken", signAccess({ username, id: user.id }), {
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
            secure: true
        });
        req.user = {
            username,
            id: user.id
        };
    
        next()
    } catch {
        res.cookie("refreshToken", "", {
            httpOnly: true,
            maxAge: 0
        });

        return next();
    }
};

export default token;