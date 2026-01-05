import { IsEmail, IsString, MinLength } from "class-validator";

export interface SignUpDto {
    name: string;
    email: string;
    password: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}