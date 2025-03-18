import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class UpdateCommunityDTO {
  @IsUrl()
  @IsOptional()
  @ApiProperty()
  image?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  @ApiProperty()
  tags?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  category?: string;
}
