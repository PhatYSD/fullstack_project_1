import { hash, compare } from "../../utils/bcrypt.util";

describe("Test Hash Text and Compare Text.", () => {
    const decode: string = "12345678";
    const encode: string = "$2b$12$qGXRGK9IS7oQTB0yHTE5.u9DcDONcnnu8zXU9Jam28yihXk86a/Ya";

    test("Hash", async () => {
        expect(await hash(decode)).toHaveLength(encode.length);
    });

    test("Commpare", async () => {
        expect(await compare(decode, encode)).toBe(true);
    });
});