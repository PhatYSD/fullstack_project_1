import loggingUtil from "../../utils/logging.util";

describe("Test Logging Mode.", () => {
    test("LoggingMode", () => {
        expect(loggingUtil).toHaveProperty("mode");
        expect(loggingUtil).toHaveProperty("option");
        expect(loggingUtil.option).toHaveProperty("stream");
    });
});