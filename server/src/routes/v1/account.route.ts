import { Router } from "express";
import { body } from "express-validator";

import { createExpense, createIncome, readAccount } from "../../controllers/v1/account.controller";
import requireUser from "../../middlewares/requireUser.middleware";
import validation from "../../middlewares/validate.middleware";

const router: Router = Router();

router.get("/", requireUser, readAccount);

router.use(
    [
        body("list")
            .notEmpty()
            .withMessage("List cannot be empty.")
            .isString()
            .withMessage("List must be only string."),
        body("amount")
            .notEmpty()
            .withMessage("Amount cannot be empty.")
            .isNumeric()
            .withMessage("Amount must be only Numberic")
    ],
    validation
);
router.post("/income", requireUser, createIncome);
router.post("/expense", requireUser, createExpense);

export default router;