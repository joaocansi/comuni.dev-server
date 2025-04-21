import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { socials } from 'src/shared/constants/socials.constant';
import { ContainsAllSocialLinks } from './custom-validators/social-links.class-validator';

class CommunityLinkDTO {
  @IsString()
  @IsIn(socials)
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  value: string;
}

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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ContainsAllSocialLinks()
  @Type(() => CommunityLinkDTO)
  @ApiProperty({ type: [CommunityLinkDTO] })
  communityLinks?: CommunityLinkDTO[];
}
