import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    @Length(14)
    cnpj!: string;

    @IsNotEmpty()
    @Length(10)
    phone!: string;

    @IsEmail()
    email!: string;

    @IsString()
    address!: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
