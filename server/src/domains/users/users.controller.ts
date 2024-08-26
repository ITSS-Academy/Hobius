import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  update(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Post()
  async create(@Request() req: any) {
    console.log(req.user);
    return await this.usersService.create(req.user);
  }

  // @Get('all')
  // async findAll() {
  //   return await this.usersService.findAll();
  // }

  @Get()
  async findOne(@Request() req: any) {
    return await this.usersService.findOne(req.user.uid || req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
