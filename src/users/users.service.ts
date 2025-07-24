// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];

  create(user: CreateUserDto) {
    this.users.push(user);
    return { message: 'User created successfully', user };
  }

  findAll() {
    return this.users;
  }

  findByEmail(email: string) {
    const user = this.users.find((u) => u.email === email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findByAge(age: number) {
    return this.users.filter((u) => u.age === age);
  }
}
