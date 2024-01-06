import { IsString, IsEmail, IsPhoneNumber, IsArray } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber()
    phoneNumber: string;

    @IsArray()
    roles: string[];
}
