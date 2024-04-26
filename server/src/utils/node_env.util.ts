import env from "./env.util";

const { NODE_ENV } = env;

enum Mode {
    Dev,
    Prod,
    Test
};

const mode = (): Mode => {
    if (NODE_ENV === "development") {
        return Mode.Dev;
    } else if (NODE_ENV === "production") {
        return Mode.Prod;
    } else {
        return Mode.Test;
    }
};

export {
    mode,
    Mode
};