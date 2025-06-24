import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterDto {
	@IsOptional()
	@IsEmail()
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}
