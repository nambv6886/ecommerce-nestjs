import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategory {
  @IsNotEmpty()
  @IsString()
  name?: string;
}