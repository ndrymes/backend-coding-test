const winston = require("winston");

class LoggerService {
  static myLogger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    transports: [
      process.env.NODE_ENV === "production"
        ? new winston.transports.Console()
        : new winston.transports.Console({
            format: winston.format.simple(),
          }),
      new winston.transports.File({ filename: "error.log", level: "error" }),
    ],
  });
  static error(msg, error) {
    LoggerService.myLogger.error({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      error,
    });
  }
  static info(msg, info = null) {
    LoggerService.myLogger.info({
      timeStamp: new Date().toLocaleString(),
      message: msg,
      data: info || "",
    });
  }
}

module.exports = LoggerService;
