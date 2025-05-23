const withErrorHandler = require("../../src/utils/dbErrorHandler");

describe("withErrorHandler", () => {
  it("should return value from handler", () => {
    const result = withErrorHandler(() => 42);

    expect(result).toBe(42);
  });

  it("should throw error from handler", () => {
    expect(() =>
      withErrorHandler(() => {
        throw new Error("Fail");
      })
    ).toThrow("File not found");
  });
});
