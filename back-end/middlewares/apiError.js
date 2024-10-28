const ApiError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  Error.captureStackTrace(error, ApiError);

  return error;
};

module.exports = ApiError;
