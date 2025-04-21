import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class CommunityLinkDTO {
  @IsString()
  @IsIn(['github', 'twitter', 'instagram', 'discord', 'reddit'])
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  value: string;
}
