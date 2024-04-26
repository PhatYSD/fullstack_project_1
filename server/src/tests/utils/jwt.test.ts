import * as jwt from "../../utils/jwt.util";

describe("Test JsonWebToken System.", () => {
    const adminUser = {
        username: "admin",
        id: "admin-00-001"
    };
    const user = {
        username: "John",
        id: "1234"
    };

    test("Admin token", () => {
        const token = jwt.signAdmin(adminUser);

        expect(token).toBeDefined();
        expect(jwt.verifyAdmin(token)).toMatchObject({
            error: null,
            status: true,
            payload: adminUser
        });
    });

    test("Access token", () => {
        const token = jwt.signAccess(user);

        expect(token).toBeDefined();
        expect(jwt.verifyAccess(token)).toMatchObject({
            error: null,
            status: true,
            payload: user
        });
    });

    test("Refresh token", () => {
        const token = jwt.signRefresh({
            username: user.username
        });

        expect(token).toBeDefined();
        expect(jwt.verifyRefresh(token)).toMatchObject({
            error: null,
            status: true,
            payload: {
                username: user.username
            }
        });
    });
});