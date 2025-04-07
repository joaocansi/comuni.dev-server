import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/@nest/guards/auth.guard';
import { CreateCommunityEventUsecase } from './usecases/create-community-event.usecase';
import {
  AuthenticatedUser,
  AuthUser,
} from 'src/@nest/decorators/authenticated-user.decorator';
import { CreateCommunityEventDTO } from './dtos/create-community-event.dto';

@Controller('community-events')
export class CommunityEventsController {
  constructor(
    private readonly createCommunityEventUsecase: CreateCommunityEventUsecase,
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
}
