import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  AuthenticatedUser,
  AuthUser,
} from 'src/shared/@nest/decorators/authenticated-user.decorator';
import { AuthGuard } from 'src/shared/@nest/guards/auth.guard';
import { CommunityEventsService } from './community-events.service';
import { CreateCommunityEventDTO } from './dtos/create-community-event.dto';
import { UpdateCommunityEventDTO } from './dtos/update-community-event.dto';

@Controller('community-events')
export class CommunityEventsController {
  constructor(
    private readonly communityEventsService: CommunityEventsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCommunityEvent(
    @Body() dto: CreateCommunityEventDTO,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.communityEventsService.create({
      ...dto,
      userId: user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Put('/:communityEventId')
  async updateCommunityEvent(
    @Body() dto: UpdateCommunityEventDTO,
    @Param('communityEventId') communityEventId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.communityEventsService.update({
      ...dto,
      id: communityEventId,
      userId: user.id,
    });
  }

  @UseGuards(AuthGuard)
  @Delete('/:communityEventId')
  async deleteCommunityEvent(
    @Param('communityEventId') communityEventId: string,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.communityEventsService.delete({
      id: communityEventId,
      userId: user.id,
    });
  }
}
