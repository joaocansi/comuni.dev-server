import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository, {
  CommunityPaginatedResult,
} from '../domain/community.repository';
import { GetCommunitiesDTO } from '../dtos/get-communities.dto';
import { Usecase } from 'src/@shared/types/usecase';

type IGetCommunitiesUsecase = GetCommunitiesDTO;
type OGetCommunitiesUsecase = CommunityPaginatedResult;

@Injectable()
export class GetCommunitiesUsecase
  implements Usecase<IGetCommunitiesUsecase, OGetCommunitiesUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async execute({
    limit,
    page,
    ...filters
  }: IGetCommunitiesUsecase): Promise<CommunityPaginatedResult> {
    return this.communityRepository.findPaginated({
      limit: Number(limit),
      page: Number(page),
      filters,
    });
  }
}
