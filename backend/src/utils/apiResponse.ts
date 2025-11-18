/**
 * @summary Creates a standardized success response object.
 * @param data The payload to be sent in the response.
 * @param metadata Optional metadata, e.g., for pagination.
 * @returns A structured success response object.
 */
export const successResponse = <T>(data: T, metadata?: object) => {
  return {
    success: true,
    data,
    ...(metadata && { metadata }),
  };
};

/**
 * @summary Creates a standardized error response object.
 * @param code The HTTP status code for the error.
 * @param message A descriptive error message.
 * @param details Optional additional details about the error.
 * @returns A structured error response object.
 */
export const errorResponse = (code: number, message: string, details?: any) => {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  };
};
