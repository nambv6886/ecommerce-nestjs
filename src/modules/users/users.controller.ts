import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, CreateUserResponse, GetUserListResponse, GetUserResponse, LoginRequest, UpdateUserDto } from './dto/user.dto';
import { GetListRequest } from 'src/models/pagination/pagination.model';
import { LoginResponse } from '../auth/dto/auth.dto';
import { AuthService } from '../auth/auth.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({
    description: 'login'
  })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
  })
  @Post('login')
  login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginRequest);
  }

  @ApiOperation({
    description: 'create user'
  })
  @ApiResponse({
    status: 200,
    type: CreateUserResponse,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    description: 'get list user'
  })
  @ApiResponse({
    status: 200,
    type: GetUserListResponse,
  })
  @Get()
  findAll(@Query() getListRequest: GetListRequest): Promise<GetUserListResponse> {
    return this.usersService.findAll(getListRequest);
  }

  @ApiOperation({
    description: 'get user by id'
  })
  @ApiResponse({
    status: 200,
    type: GetUserResponse,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GetUserResponse> {
    return this.usersService.getDetails(+id);
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
