import { ApiProperty } from "@nestjs/swagger";
import { IPagedRequest } from "../interfaces/i-paged-request";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Resource } from "src/app.resource";
import { User } from "src/users/entities/user.entity";

export class GetListRequest implements IPagedRequest {
  @ApiProperty()
  @IsNotEmpty({ message: Resource.GET_LIST_PAGE_INDEX_REQUIRED })
  @IsNumber({}, { message: Resource.GET_LIST_PAGE_INDEX_NOT_NUMBER })
  pageIndex: number;

  @ApiProperty()
  @IsNumber({}, { message: Resource.GET_LIST_PAGE_SIZE_NOT_NUMBER })
  @IsNotEmpty({ message: Resource.GET_LIST_PAGE_SIZE_REQUIRED })
  pageSize: number;

  @ApiProperty()
  orderBy: string;

  constructor(fields?: Partial<GetListRequest>) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}