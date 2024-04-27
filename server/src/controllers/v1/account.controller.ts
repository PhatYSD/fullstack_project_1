import { matchedData } from "express-validator";
import { Response, RequestHandler, NextFunction } from "express";

import { RequestUser } from "../../middlewares/token.middleware";
import prisma from "../../utils/prisma.util";

export const readAccount: RequestHandler = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: req.user?.id as string,
                username: req.user?.username as string
            },
            select: {
                account: {
                    select: {
                        balance: true,
                        expense: true,
                        income: true
                    }
                }
            }
        });

        res.json({
            message: "Successfully to get account",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

export const createIncome: RequestHandler = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        const { list, amount } = matchedData(req);
        const userId = req.user?.id as string;

        await prisma.account.update({
            where: {
                userId
            },
            data: {
                income: {
                    create: {
                        list,
                        amount
                    }
                },
                balance: {
                    increment: amount
                }
            }
        });

        res.status(201).json({
            message: "Created a new list income."
        });
    } catch (error) {
        next(error);
    }
};

export const createExpense: RequestHandler = async (req: RequestUser, res: Response, next: NextFunction) => {
    try {
        const { list, amount } = matchedData(req);
        const userId = req.user?.id as string;

        await prisma.account.update({
            where: {
                userId
            },
            data: {
                expense: {
                    create: {
                        list,
                        amount
                    }
                },
                balance: {
                    decrement: amount
                }
            }
        });

        res.status(201).json({
            message: "Created a new list expense."
        });
    } catch (error) {
        next(error);
    }
}