export const withAsync = async (
  asyncFn,
  setLoading,
  navigate,
  errorRoutes = {},
  onSuccess
) => {
  setLoading(true);
  try {
    const result = await asyncFn();

    if (onSuccess) onSuccess(result);

    return result;
  } catch (e) {
    const route = errorRoutes[e.status] || errorRoutes.default;

    if (route) navigate(route);
  } finally {
    setLoading(false);
  }
};
