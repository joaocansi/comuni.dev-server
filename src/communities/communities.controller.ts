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
} from 'src/@shared/decorators/authenticated-user.decorator';
import { AuthGuard } from 'src/@shared/guards/auth.guard';
import { GetCommunitiesDTO } from './dtos/get-communities.dto';
import { CreateCommunityUsecase } from './usecases/create-community.usecase';
import { GetCommunityUsecase } from './usecases/get-community.usecase';
import { JoinCommunityUsecase } from './usecases/join-community.usecase';
import { GetCommunitiesUsecase } from './usecases/get-communities.usecase';
import { NonRestrictedAuthGuard } from 'src/@shared/guards/non-restricted-auth.guard';
import { LeaveCommunityUsecase } from './usecases/leave-community.usecase';
import { UpdateCommunityUsecase } from './usecases/update-community.usecase';
import { UpdateCommunityDTO } from './dtos/update-community.dto';

@Controller('communities')
export class CommunitiesController {
  constructor(
    private readonly createCommunityUsecase: CreateCommunityUsecase,
    private readonly updateCommunityUsecase: UpdateCommunityUsecase,
    private readonly getCommunityUsecase: GetCommunityUsecase,
    private readonly getCommunitiesUsecase: GetCommunitiesUsecase,
    private readonly joinCommunityUsecase: JoinCommunityUsecase,
    private readonly leaveCommunityUsecase: LeaveCommunityUsecase,
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

  @UseGuards(AuthGuard)
  @Post('/:communityId/join')
  async joinCommunity(
    @Param('communityId') communityId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.joinCommunityUsecase.execute({ communityId, userId: user.id });
  }

  @UseGuards(AuthGuard)
  @Post('/:communityId/leave')
  async leaveCommunity(
    @Param('communityId') communityId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.leaveCommunityUsecase.execute({ communityId, userId: user.id });
  }
}
