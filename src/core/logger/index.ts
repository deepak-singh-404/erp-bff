import * as winston from "winston";
import "winston-daily-rotate-file";

const accessTransport = new winston.transports.DailyRotateFile({
    filename: `/var/log/erp-bff/%DATE%-access.log`,
    datePattern: "YYYY-MM-DD",
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
});

const errorTransport = new winston.transports.DailyRotateFile({
    filename: `/var/log/erp-bff/%DATE%-error.log`,
    datePattern: "YYYY-MM-DD",
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
});

export const accessLogger = winston.createLogger({
    transports: [accessTransport],
});

export const errorLogger = winston.createLogger({
    transports: [errorTransport],
});
