import { registerAs } from "@nestjs/config";

export default registerAs('properties', () => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: +process.env.PORT,
        JWT: {
            SECRET: process.env.JWT_SECRET,
            EXPIRES_IN_DAYS: process.env.JWT_EXPIRES_IN_DAYS,
        },
        LOGGER_FILE_PATH: process.env.LOGGER_FILE_PATH,
        MONGODB_CONNECTION_URI: process.env.MONGODB_CONNECTION_URI
    }
})