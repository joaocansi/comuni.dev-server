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
import { GetCommunitiesDTO } from './dtos/get-communities.dto';
import { UpdateCommunityDTO } from './dtos/update-community.dto';
import { CommunitiesService } from './communities.service';
import { AuthGuard } from 'src/shared/@nest/guards/auth.guard';
import {
  AuthenticatedUser,
  AuthUser,
} from 'src/shared/@nest/decorators/authenticated-user.decorator';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCommunity(
    @Body() dto: CreateCommunityDTO,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.communitiesService.create({
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
    return this.communitiesService.update({
      ...dto,
      id: communityId,
      ownerId: user.id,
    });
  }

  @Get()
  async getCommunities(@Query() query: GetCommunitiesDTO) {
    const { page, limit, state, city, tags } = query;
    const filters = {
      ...(state && { state }),
      ...(city && { city }),
      ...(tags && { tags }),
    };
    const paginationOptions = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      filters,
    };
    return this.communitiesService.getPaginatedCommunities(paginationOptions);
  }

  @Get('/:slug')
  async getCommunity(@Param('slug') slug: string) {
    return this.communitiesService.getCommunity({ slug });
  }
}
