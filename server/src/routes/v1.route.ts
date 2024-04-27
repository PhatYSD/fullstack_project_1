import express, { Express } from "express";

import authRoute from "./v1/auth.route";
import account from "./v1/account.route";

const router: Express = express();

router.use("/auth", authRoute);
router.use("/account", account);

export default router;