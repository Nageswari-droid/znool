/**
 * Utility for handling errors in network request handlers.
 *
 * Wraps a request handler and sends a standardized error response if an exception occurs.
 */
const { STATUS_CODES, STATUS_MESSAGES } = require("../constants/status");

/**
 * Wraps an Express request handler to catch errors and send a 500 response.
 * @function
 * @param {Function} handler - The request handler function (req, res)
 * @returns {Function} A new function that handles errors and sends a 500 response if needed
 */
function withErrorHandler(handler) {
  return (req, res) => {
    try {
      handler(req, res);
    } catch {
      res
        .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send(STATUS_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  };
}

module.exports = withErrorHandler;
