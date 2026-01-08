import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class SignInDto {
    @ApiProperty({ example: "maria@exemplo.com" })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: "senha-forte-123" })
    @IsString()
    @MinLength(8)
    password!: string;
}

export class SignUpDto {
    @ApiProperty({ example: "Maria Silva" })
    @IsNotEmpty()
    @MinLength(3)
    name!: string;

    @ApiProperty({ example: "maria@exemplo.com" })
    @IsEmail()
    email!: string;

    @ApiProperty({ example: "senha-forte-123" })
    @IsNotEmpty()
    @MinLength(8)
    password!: string;
}
