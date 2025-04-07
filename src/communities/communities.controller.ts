import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCommunityDTO } from './dtos/create-community.dto';
import {
  AuthenticatedUser,
  AuthUser,
} from 'src/@nest/decorators/authenticated-user.decorator';
import { AuthGuard } from 'src/@nest/guards/auth.guard';
import { GetCommunitiesDTO } from './dtos/get-communities.dto';
import { CreateCommunityUsecase } from './usecases/create-community.usecase';
import { GetCommunityUsecase } from './usecases/get-community.usecase';
import { GetCommunitiesUsecase } from './usecases/get-communities.usecase';
import { NonRestrictedAuthGuard } from 'src/@nest/guards/non-restricted-auth.guard';
import { UpdateCommunityUsecase } from './usecases/update-community.usecase';
import { UpdateCommunityDTO } from './dtos/update-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly createCommunityUsecase: CreateCommunityUsecase,
    private readonly updateCommunityUsecase: UpdateCommunityUsecase,
    private readonly getCommunityUsecase: GetCommunityUsecase,
    private readonly getCommunitiesUsecase: GetCommunitiesUsecase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCommunity(
    @Body() dto: CreateCommunityDTO,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.createCommunityUsecase.execute({
      ...dto,
      ownerId: user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('/:communityId')
  async updateCommunity(
    @Param('communityId') communityId: string,
    @Body() dto: UpdateCommunityDTO,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.updateCommunityUsecase.execute({
      ...dto,
      id: communityId,
      ownerId: user.id,
    });
  }

  @UseGuards(NonRestrictedAuthGuard)
  @Get()
  async getCommunities(@Query() query: GetCommunitiesDTO) {
    return this.getCommunitiesUsecase.execute(query);
  }

  @UseGuards(NonRestrictedAuthGuard)
  @Get('/:communitySlug')
  async getCommunity(
    @Param('communitySlug') communitySlug: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.getCommunityUsecase.execute({
      communitySlug,
      userId: user?.id ?? null,
    });
  }
}
