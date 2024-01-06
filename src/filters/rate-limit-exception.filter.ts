import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch(HttpException)
export class RateLimitExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        if (exception.getStatus() === HttpStatus.TOO_MANY_REQUESTS) {
            console.log("IP: ", request.ip);
            console.log("USER_AGENT: ", request.headers['user-agent']);
        }

        response.status(exception.getStatus()).json({
            statusCode: exception.getStatus(),
            message: exception.message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}
