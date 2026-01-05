import { IsAlpha, IsAlphanumeric, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;
}