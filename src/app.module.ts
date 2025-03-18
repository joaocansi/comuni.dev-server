import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommunitiesModule } from './communities/communities.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), CommunitiesModule, UsersModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class AppModule {
  static register(db: any): DynamicModule {
    return {
      module: AppModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: db,
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
