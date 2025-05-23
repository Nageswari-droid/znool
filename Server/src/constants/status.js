const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
};

const STATUS_MESSAGES = {
  OK: "OK",
  CREATED: "Created!",
  INTERNAL_SERVER_ERROR: "Internal server error",
  NOT_FOUND: "Not found",
  BAD_REQUEST: "Already exists",
};

module.exports = { STATUS_CODES, STATUS_MESSAGES };
