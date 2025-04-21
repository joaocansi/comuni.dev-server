import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsUrl,
  ValidateIf,
  IsIn,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CommunityEventFormat,
  CommunityEventFormatValues,
} from '../domain/community-event';
import { ApiProperty } from '@nestjs/swagger';
import {
  CityMatchesStateConstraint,
  STATES,
} from 'src/shared/constants/location.constant';

export class CreateCommunityEventDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @ValidateIf((o) => o.date > new Date(Date.now() + 60 * 60 * 1000))
  date: Date;

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
  format: CommunityEventFormat;

  @IsUrl()
  @IsNotEmpty()
  calendarLink: string;

  @IsString()
  @IsNotEmpty()
  communityId: string;
}
