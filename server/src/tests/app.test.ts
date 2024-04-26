import request from "supertest";

import app from "../app";

describe("Test Common Configure in app.ts", () => {
    test("GET to '/api/v1/helloworld'", async () => {
        const response = await request(app).get("/api/v1/helloworld");

        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World.");
    });
});