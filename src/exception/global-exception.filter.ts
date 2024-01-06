import { Catch, ExceptionFilter, ArgumentsHost, Logger, HttpException } from '@nestjs/common';

const logger = new Logger('GlobalExceptionFilter');

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : 500;

        logger.error(exception); // Log the error
        response
            .status(status)
            .json({
                statusCode: status,
                message: exception.message,
            });
    }
}
