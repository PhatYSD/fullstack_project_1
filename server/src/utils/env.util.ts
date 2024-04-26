import "dotenv/config";
import { cleanEnv, str, num } from "envalid";

const env = cleanEnv(process.env, {
    NODE_ENV: str(),
    NODE_PORT: num(),
    NODE_HOSTNAME: str(),
    JWT_SECRET_ADMIN_TOKEN_KEY: str(),
    JWT_SECRET_ACCESS_TOKEN_KEY: str(),
    JWT_SECRET_REFRESH_TOKEN_KEY: str()
});

export default env;