import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { SigninDto, SignupDto } from './auth.dto';
import { AuthService } from './auth.service';
import { requestParser, sendApiResponse } from 'src/utils/common.utils';
import { API_MESSAGES } from 'src/common/constant';
import { ExceptionLogRepository } from 'src/database/repository/exception-log.repository';
import { CustomException } from 'src/exception/custom-exception';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly exceptionLogRepository: ExceptionLogRepository
    ) { }

    logAndThrowException(req: any, err: any): void {
        console.error(err)
        req.exceptionError = err?.response?.data || err.message;
        this.exceptionLogRepository.saveExceptionLog(requestParser(req) as any);
        throw new CustomException(req.exceptionError);
    }

    @Post('/signin')
    async signin(@Body() signinDto: SigninDto, @Req() req, @Res() res): Promise<any> {
        try {
            const data = await this.authService.signin(signinDto);
            return sendApiResponse(res, true, HttpStatus.OK, API_MESSAGES.LOGIN_SUCESSFULLY, data)
        } catch (err) {
            this.logAndThrowException(req, err)
        }
    }

    @Post('/signup')
    async signup(@Body() signupDto: SignupDto, @Req() req, @Res() res): Promise<any> {
        try {
            const data = await this.authService.signup(signupDto);
            return sendApiResponse(res, true, HttpStatus.OK, API_MESSAGES.REGISTRATION_SUCCESSFUL, data)
        } catch (err) {
            this.logAndThrowException(req, err)
        }
    }
}