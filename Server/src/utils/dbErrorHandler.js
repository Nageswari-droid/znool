/**
 * Utility for handling errors during database operations.
 *
 * Wraps a function and throws a standardized error if an exception occurs.
 */

/**
 * Executes the provided handler function and catches errors.
 * @function
 * @param {Function} handler - The function to execute
 * @returns {*} The result of the handler function
 * @throws {Error} If the handler throws an error, throws a 'File not found' error
 */
function withErrorHandler(handler) {
  try {
    return handler();
  } catch {
    throw new Error("File not found");
  }
}

module.exports = withErrorHandler;
