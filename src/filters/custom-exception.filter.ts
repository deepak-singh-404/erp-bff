import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { CustomException } from "../exception/custom-exception";
import { API_MESSAGES } from "src/common/constant";

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: CustomException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        response.status(exception.getStatus()).json({
            status: false,
            statusCode: exception.getStatus(),
            message: API_MESSAGES.SOMETHING_WENT_WRONG,
            error: exception.getResponse(),
            timestamp: new Date().toISOString(),
        });
    }
}
