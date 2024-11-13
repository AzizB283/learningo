import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/Guards';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  signIn(@Request() req): string {
    // authentication complete
    // next step authorize
    // generate jwt token
    console.log(req.user);

    // return req.user;
    const { password, ...rest } = req.user;

    const token = this.authService.generateToken(rest);
    return token;
  }

  // For google login

  @Get('google')
  @UseGuards(AuthGuard('google'))
  handleLogin() {
    return 'Google Login Successful';
  }

  // Google redirect

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  handleRedirect() {
    return 'Google Redirected to here';
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
