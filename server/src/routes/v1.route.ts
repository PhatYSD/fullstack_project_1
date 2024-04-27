import express, { Express } from "express";

import authRoute from "./v1/auth.route";

const router: Express = express();

router.use("/auth", authRoute);

export default router;