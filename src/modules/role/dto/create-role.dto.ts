import { IsEnum, IsString } from 'class-validator';
import { Privilege } from '../entities/role.entity';

export class CreateRoleDto {
  @IsString()
  name: string;

  @IsString()
  @IsEnum(Privilege, { each: true }) // 'each: true' validates every item in the array
  privileges: Privilege[];
}
