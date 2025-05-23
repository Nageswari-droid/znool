const { STATUS_CODES, STATUS_MESSAGES } = require("../constants/status");

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
