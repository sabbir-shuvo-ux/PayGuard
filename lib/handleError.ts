type ErrorResponse = {
  success: false;
  error: string;
};

export function handleError(err: unknown): ErrorResponse {
  if (err instanceof Error) {
    // If it's an instance of the built-in Error class
    return {
      success: false,
      error: err.message,
    };
  } else if (typeof err === "string") {
    // If it's a string error message
    return {
      success: false,
      error: err,
    };
  }
  // Handle other error types or return a default message
  return {
    success: false,
    error: "An unknown error occurred",
  };
}
