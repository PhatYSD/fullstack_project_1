import morgan from "morgan";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";

import loggingMode from "./utils/logging.util";
import v1 from "./routes/v1.route";
import handleError from "./middlewares/handleError.middleware";
import token from "./middlewares/token.middleware";

const app: Express = express();
const corsOption: CorsOptions = {
    credentials: true
};

// json application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// middleware cross origin
app.use(cors(corsOption));
// use logging
app.use(morgan(loggingMode.mode, loggingMode.option));
// use cookie app
app.use(cookieParser());

// test enpoint /api/helloworld
app.get("/api/helloworld", (_: Request, res: Response) => {
    res.status(200).send("Hello World.");
});

app.use("/api/v1", token, v1);
// use handle error middleware
app.use(handleError);

export default app;