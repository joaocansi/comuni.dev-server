import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsUrl,
  ValidateIf,
  IsOptional,
  Validate,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CommunityEventFormat,
  CommunityEventFormatValues,
} from '../domain/community-event';
import {
  CityMatchesStateConstraint,
  STATES,
} from 'src/shared/constants/location.constant';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommunityEventDTO {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiProperty()
  date: Date;

  @ValidateIf((o) => o.format !== 'VIRTUAL')
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address?: string;

  @ValidateIf((o) => o.format !== 'VIRTUAL')
  @IsString()
  @IsNotEmpty()
  @IsIn(STATES)
  @ApiProperty()
  state?: string;

  @ValidateIf((o) => o.format !== 'VIRTUAL')
  @IsString()
  @IsNotEmpty()
  @Validate(CityMatchesStateConstraint)
  @ApiProperty()
  city?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(CommunityEventFormatValues)
  @ApiProperty()
  format: CommunityEventFormat;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  calendarLink: string;
}
