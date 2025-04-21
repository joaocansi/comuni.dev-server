import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CommunityLinkDTO } from './defaults/community-link.dto';
import {
  CityMatchesStateConstraint,
  STATES,
} from 'src/shared/constants/location.constant';

export class CreateCommunityDTO {
  @IsUrl()
  @ApiProperty()
  image: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(STATES)
  @ApiProperty()
  state: string;

  @IsString()
  @IsNotEmpty()
  @Validate(CityMatchesStateConstraint)
  @ApiProperty()
  city: string;

  @IsArray()
  @ArrayMinSize(1)
  @ApiProperty()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommunityLinkDTO)
  @ApiProperty({ type: [CommunityLinkDTO] })
  communityLinks: CommunityLinkDTO[];
}
