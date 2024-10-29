class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    Error.captureStackTrace(this, ApiError);
  }
}

module.exports = ApiError;
