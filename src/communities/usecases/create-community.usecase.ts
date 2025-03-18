import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import { CreateCommunityDTO } from '../dtos/create-community.dto';
import { CommunitySchema } from '../domain/community.schema';
import Community from '../domain/community';
import { Usecase } from 'src/@shared/types/usecase';
import { generateSlug } from 'src/@shared/utils/slug-generator';
import { AppError, AppErrorType } from 'src/@shared/errors/app-error';

type ICreateCommunityUsecase = CreateCommunityDTO & {
  ownerId: string;
};

type OCreateCommunityUsecase = Community;

@Injectable()
export class CreateCommunityUsecase
  implements Usecase<ICreateCommunityUsecase, OCreateCommunityUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async execute(data: ICreateCommunityUsecase): Promise<Community> {
    const slug = generateSlug(data.name);

    const community = await this.communityRepository.findBySlug(slug);
    if (community) {
      throw new AppError(
        'comunidade já existe',
        AppErrorType.COMMUNITY_ALREADY_EXISTS,
      );
    }

    const createdCommunity = await this.communityRepository.create({
      ...data,
      slug,
    });
    return CommunitySchema.toDomain(createdCommunity as CommunitySchema);
  }
}
