import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCommunitiesDTO {
  @ApiProperty({ required: false, type: Number })
  limit: string;
  @ApiProperty({ required: false, type: Number })
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
