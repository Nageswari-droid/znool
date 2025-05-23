const withErrorHandler = require("../../src/utils/networkErrorHandler");

describe("withErrorHandler", () => {
  it("should send 500 if handler throws", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const handler = () => {
      throw new Error("fail");
    };

    withErrorHandler(handler)(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("Internal server error");
  });
});
