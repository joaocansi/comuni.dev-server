import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { tags } from 'src/shared/constants/tags.constant';

export class GetCommunitiesDTO {
  @ApiProperty({ required: false, type: Number, minimum: 1, maximum: 30 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(30)
  limit: string;
  @ApiProperty({ required: false, type: Number, minimum: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  page: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  state?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  city?: string;
  @IsArray()
  @IsIn(tags)
  @IsOptional()
  @ApiProperty({ required: false })
  tags?: string[];
}
