import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator'
import { Resource } from '../../../app.resource';
import { EMAIL_REGEX } from '../../../common/constants/common';
import { IResponse } from '../../../models/interfaces/i-response';
import { ResponseMessage } from 'src/models/interfaces/response.message.model';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IPagedResponse } from 'src/models/interfaces/i-paged-response';

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty({ message: Resource.EMAIL_IS_REQUIRED })
  @Matches(EMAIL_REGEX, { message: Resource.EMAIL_IS_INVALID })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: Resource.PASSWORD_IS_REQUIRED })
  password: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: Resource.EMAIL_IS_REQUIRED })
  @Matches(EMAIL_REGEX, { message: Resource.EMAIL_IS_INVALID })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: Resource.PASSWORD_IS_REQUIRED })
  @MinLength(6, { message: Resource.PASSWORD_IS_INVALID_MIN_LENGTH })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: Resource.ROLE_IS_REQUIRED })
  role: string;
}

export class CreateUserResponse implements IResponse {
  @ApiProperty()
  public responseMessage: ResponseMessage;
  @ApiProperty()
  public referenceUserId: number;
  constructor(fields?: Partial<CreateUserResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  profile?: string;
}

export class UserInfo {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
  constructor(user?: User) {
    this.id = user?.id;
    this.email = user?.email;
    this.role = user?.role;
  }
}

export class GetUserResponse implements IResponse {
  @ApiProperty()
  responseMessage: ResponseMessage;
  @ApiProperty()
  account: UserInfo;

  constructor(fields?: Partial<GetUserResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class UpdateUserResponse implements IResponse {
  @ApiProperty()
  responseMessage: ResponseMessage;
  constructor(fields?: Partial<GetUserResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}

export class GetUserListResponse implements IPagedResponse {
  @ApiProperty()
  responseMessage: ResponseMessage;
  @ApiProperty()
  totalItemCount: number;
  @ApiProperty()
  pageIndex: number;
  @ApiProperty()
  pageSize: number;
  @ApiProperty()
  users: UserInfo[];

  constructor(fields?: Partial<GetUserListResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}