import { IsString } from "class-validator";

export class SigninDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class SignupDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}
