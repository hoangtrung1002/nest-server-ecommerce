import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  shortDescription: string;

  @IsNumber()
  regularPrice: number;

  @IsString()
  discountPrice: number;

  @IsString()
  quantity: number;

  @IsNumber()
  weight: number;

  @IsBoolean()
  published: boolean;

  @IsNumber()
  createdBy: number;

  @IsNumber()
  updatedBy: number;
}
