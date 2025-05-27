import { withAsync } from "./withAsync";

describe("withAsync", () => {
  let setLoading, navigate, onSuccess;

  beforeEach(() => {
    setLoading = jest.fn();
    navigate = jest.fn();
    onSuccess = jest.fn();
  });

  it("calls asyncFn, sets loading, and calls onSuccess", async () => {
    const asyncFn = jest.fn().mockResolvedValue("result");

    const result = await withAsync(
      asyncFn,
      setLoading,
      navigate,
      {},
      onSuccess
    );

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(asyncFn).toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith("result");
    expect(result).toBe("result");
  });

  it("navigates to error route by status", async () => {
    const asyncFn = jest.fn().mockRejectedValue({ status: 404 });
    const errorRoutes = { 404: "/error/404" };

    await withAsync(asyncFn, setLoading, navigate, errorRoutes, onSuccess);

    expect(navigate).toHaveBeenCalledWith("/error/404");
  });
});
