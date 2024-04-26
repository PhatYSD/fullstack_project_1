import env from "../../utils/env.util";

describe("Test configure to .env file.", () => {
    test("load environments", () => { 
        expect(env).toHaveProperty("NODE_ENV");
        expect(env).toHaveProperty("NODE_PORT");
        expect(env).toHaveProperty("NODE_HOSTNAME");
        expect(env).toHaveProperty("JWT_SECRET_ADMIN_TOKEN_KEY");
        expect(env).toHaveProperty("JWT_SECRET_ACCESS_TOKEN_KEY");
        expect(env).toHaveProperty("JWT_SECRET_REFRESH_TOKEN_KEY");
    });
});