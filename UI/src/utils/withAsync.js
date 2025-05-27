/**
 * Utility for handling asynchronous operations with loading and error navigation.
 */

/**
 * Executes an async function with loading state and error-based navigation.
 * @function
 * @param {Function} asyncFn - The async function to execute
 * @param {Function} setLoading - Function to set loading state (boolean)
 * @param {Function} navigate - Function to navigate to a route
 * @param {Object} [errorRoutes={}] - Map of error status codes to routes
 * @param {Function} [onSuccess] - Optional callback for successful result
 * @returns {Promise<*>} The result of asyncFn, or undefined if navigation occurs on error
 */
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
