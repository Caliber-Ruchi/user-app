// src/users/users.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ValidationPipe } from './pipes/validation.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('users') // Groups under "users" in Swagger UI
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users or filter by age' })
  @ApiQuery({ name: 'age', required: false, type: Number, description: 'Filter by age' })
  @ApiResponse({ status: 200, description: 'List of users' })
  getUsers(@Query('age') age?: string) {
    return age
      ? this.userService.findByAge(parseInt(age))
      : this.userService.findAll();
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get a user by email' })
  @ApiParam({ name: 'email', type: String, description: 'Email of the user' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }
}
