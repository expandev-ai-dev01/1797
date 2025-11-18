/**
 * @summary A simple logger utility.
 * In a real-world application, this would be replaced with a more robust logging library
 * like Winston or Pino, with support for different transports (console, file, etc.) and log levels.
 */

const log = (level: string, message: string, data?: object) => {
  const timestamp = new Date().toISOString();
  const logObject = {
    timestamp,
    level,
    message,
    ...data,
  };
  console.log(JSON.stringify(logObject));
};

export const logger = {
  info: (message: string, data?: object) => log('INFO', message, data),
  warn: (message: string, data?: object) => log('WARN', message, data),
  error: (message: string, data?: object) => log('ERROR', message, data),
  debug: (message: string, data?: object) => {
    if (process.env.NODE_ENV !== 'production') {
      log('DEBUG', message, data);
    }
  },
};
