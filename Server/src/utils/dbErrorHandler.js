function withErrorHandler(handler) {
  try {
    return handler();
  } catch {
    throw new Error("File not found");
  }
}

module.exports = withErrorHandler;
