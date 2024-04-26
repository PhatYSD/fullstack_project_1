import express, { Express, Request, Response } from "express";
import morgan from "morgan";

import loggingMode from "./utils/logging.util";

const app: Express = express();

// json application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// use logging
app.use(morgan(loggingMode.mode, loggingMode.option));

app.get("/api/v1/helloworld", (_: Request, res: Response) => {
    res.status(200).send("Hello World.");
});

export default app;