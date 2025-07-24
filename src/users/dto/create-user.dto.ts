// src/users/dto/create-user.dto.ts
import { IsNotEmpty, IsEmail, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email!: string;

  @IsInt({ message: 'Age must be an integer' })
  @Min(0, { message: 'Age must be at least 0' })
  @Max(120, { message: 'Age must be at most 120' })
  age!: number;
}
