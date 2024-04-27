import { Request, RequestHandler, Response, NextFunction } from "express";
import { matchedData } from "express-validator";
import createHttpError from "http-errors";

import prisma from "../../utils/prisma.util";
import { compare, hash } from "../../utils/bcrypt.util";
import { signRefresh } from "../../utils/jwt.util";
import { RequestUser } from "../../middlewares/token.middleware";

export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = matchedData(req);
        const hashPassword: string = await hash(password);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashPassword
            }
        });

        if (user) {
            await prisma.account.create({
                data: {
                    userId: user.id
                }
            });
        }

        res.cookie("refreshToken", signRefresh({ username }), {
            maxAge: 1000 * 60 * 60 * 24 * 30
        });

        res.status(201).json({ message: "Created a New User." });
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = matchedData(req);

        const user = await prisma.user.findFirstOrThrow({
            where: {
                username
            },
            select: {
                password: true
            }
        });

        if (!await compare(password, user.password)) {
            throw createHttpError(401, "Unauthorized - Invalid password.");
        }

        res.cookie("refreshToken", signRefresh({ username }), {
            maxAge: 1000 * 60 * 60 * 24 * 30
        });
        res.json({ message: `Login successfully. Welcome ${username}.` });
    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (_req: RequestUser, res: Response, next: NextFunction) => {
    try {
        res.cookie("refreshToken", "", {
            maxAge: 0,
            httpOnly: true
        });
        res.cookie("accessToken", "", {
            maxAge: 0,
            httpOnly: true
        });

        res.json({ message: `Logout successfully.` });
    } catch (error) {
        next(error);
    }
};

export const infoUser: RequestHandler = (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        res.json({
            message: `Successfully to get info`,
            data: user
        });
    } catch (error) {
        next(error);
    }
};