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
  
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
  
    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
      return this.userService.create(createUserDto);
    }
  
    @Get()
    getUsers(@Query('age') age?: string) {
      return age
        ? this.userService.findByAge(parseInt(age))
        : this.userService.findAll();
    }
  
    @Get(':email')
    getUserByEmail(@Param('email') email: string) {
      return this.userService.findByEmail(email);
    }
}
  