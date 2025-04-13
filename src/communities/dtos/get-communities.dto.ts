import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

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
  category?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  state?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  city?: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  tag?: string;
}
