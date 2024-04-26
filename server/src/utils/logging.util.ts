import { mode, Mode } from "./node_env.util";
import path from "path";
import fs from "fs";

interface LoggingMode {
    mode: "dev" | "combined" | "tiny",
    option?: {
        stream: fs.WriteStream
    }
}

const loggingMode = (): LoggingMode => {
    if (mode() === Mode.Dev) {
        return {
            mode: "dev"
        };
    }
    if (mode() === Mode.Prod) {
        const pathLog: string = path.join("logs", ".logs");

        if (!fs.readdirSync(path.join()).includes("logs")) {
            fs.mkdirSync(path.join("logs"));
        }

        const writeStream: fs.WriteStream = fs.createWriteStream(pathLog, { flags: "a" });

        return {
            mode: "combined",
            option: { stream: writeStream }
        };
    }

    const pathLog: string = path.join("logs", ".test.logs");

    if (!fs.readdirSync(path.join()).includes("logs")) {
        fs.mkdirSync(path.join("logs"));
    }

    const writeStream: fs.WriteStream = fs.createWriteStream(pathLog, { flags: "a" });

    return {
        mode: "tiny",
        option: {
            stream: writeStream
        }
    };
};

export default loggingMode();