import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { auth } from '../auth';
import { fromNodeHeaders } from 'better-auth/node';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(request.headers),
    });

    if (session) {
      request['user'] = session.user;
      return true;
    }

    return false;
  }
}
