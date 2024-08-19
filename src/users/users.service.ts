import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CommonUtils } from '../common/utils/common.utils';
import { ResponseMessage } from '../models/interfaces/response.message.model';
import { ResponseStatus } from '../models/interfaces/response.status.model';
import { Resource } from '../app.resource';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, CreateUserResponse, GetUserListResponse, GetUserResponse, UpdateUserDto, UserInfo } from './dto/user.dto';
import { GetListRequest } from 'src/models/pagination/pagination.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) { }
  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    try {
      // verify capcha
      // verify user exists
      const user = await this.usersRepository.findOneBy({ email: createUserDto.email });
      if (CommonUtils.isNotNullOrUndefined(user)) {
        return new CreateUserResponse({
          responseMessage: new ResponseMessage({
            status: ResponseStatus.Fail,
            messageCode: Resource.EMAIL_IS_EXISTED
          })
        })
      }

      // reference user
      let referenceUserId = 0;

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.usersRepository.create({
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role,
      });
      await this.usersRepository.save(newUser);

      // send email verify
      return new CreateUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Success,
          messageCode: Resource.SUCCESS,
        }),
        referenceUserId,
      })
    } catch (error) {
      Logger.error(error);
      return new CreateUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: Resource.FAIL,
        })
      })
    }
  }

  async findAll(getListRequest: GetListRequest): Promise<GetUserListResponse> {
    try {

      const [users, count] = await this.usersRepository.findAndCount({
        skip: getListRequest.pageIndex,
        take: getListRequest.pageSize,
      });

      const userList = users.map(user => {
        return new UserInfo(user);
      });

      return new GetUserListResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Success,
          messageCode: Resource.SUCCESS,
        }),
        users: userList,
        totalItemCount: count,
        pageIndex: getListRequest.pageIndex,
        pageSize: getListRequest.pageSize,
      })
    } catch (error) {
      Logger.error(error);
      return new GetUserListResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: Resource.FAIL,
        }),
        users: [],
        totalItemCount: 0,
      })
    }
  }

  async findOneById(id: number): Promise<GetUserResponse> {
    const user = await this.usersRepository.findOneBy({ id });
    if (CommonUtils.isNullOrUndefined(user)) {
      return new GetUserResponse({
        responseMessage: new ResponseMessage({
          status: ResponseStatus.Fail,
          messageCode: Resource.NOT_FOUND,
        })
      })
    }

    const userInfo = new UserInfo(user);
    return new GetUserResponse({
      responseMessage: new ResponseMessage({
        status: ResponseStatus.Success,
        messageCode: Resource.SUCCESS,
      }),
      account: userInfo,
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
