import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CommunityEventFormat,
  CommunityEventFormatValues,
} from '../domain/community-event';

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
  address?: string;

  @ValidateIf((o) => o.format !== 'VIRTUAL')
  @IsString()
  @IsNotEmpty()
  state?: string;

  @ValidateIf((o) => o.format !== 'VIRTUAL')
  @IsString()
  @IsNotEmpty()
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
