import prisma from "../../utils/prisma.util";

describe("Test Create Prisma Instance.", () => {
    test("Create", () => {
        expect(prisma).toBeDefined();
    });
});