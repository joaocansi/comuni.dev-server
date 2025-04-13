import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/@nest/guards/auth.guard';
import { CreateCommunityEventUsecase } from './usecases/create-community-event.usecase';
import {
  AuthenticatedUser,
  AuthUser,
} from 'src/@nest/decorators/authenticated-user.decorator';
import { CreateCommunityEventDTO } from './dtos/create-community-event.dto';
import { UpdateCommunityEventDTO } from './dtos/update-community-event.dto';
import { DeleteCommunityEventUseCase } from './usecases/delete-community-event.usecase';
import { UpdateCommunityEventUsecase } from './usecases/update-community-event.usecase';

@Controller('community-events')
export class CommunityEventsController {
  constructor(
    private readonly createCommunityEventUsecase: CreateCommunityEventUsecase,
    private readonly updateCommunityEventUsecase: UpdateCommunityEventUsecase,
    private readonly deleteCommunityEventUsecase: DeleteCommunityEventUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async createCommunityEvent(
    @Body() dto: CreateCommunityEventDTO,
    @AuthenticatedUser() user: AuthUser,
  ) {
    return this.createCommunityEventUsecase.execute({
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
    return this.updateCommunityEventUsecase.execute({
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
    return this.deleteCommunityEventUsecase.execute({
      id: communityEventId,
      userId: user.id,
    });
  }
}
