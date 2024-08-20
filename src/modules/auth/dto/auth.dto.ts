import { IResponse } from "src/models/interfaces/i-response";
import { ResponseMessage } from "src/models/interfaces/response.message.model";
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse implements IResponse {
  @ApiProperty()
  responseMessage: ResponseMessage;
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshAccessToken: string;

  constructor(fields?: Partial<LoginResponse>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}