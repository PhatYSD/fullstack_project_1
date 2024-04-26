import { mode, Mode } from "../../utils/node_env.util";

describe("Test Node env mode.", () => {
    test("Test mode", () => expect(mode()).toBe(Mode.Test));
});