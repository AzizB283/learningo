import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    console.log('inside guard0', activate);
    const request = context.switchToHttp().getRequest();
    console.log(request);

    await super.logIn(request);
    return activate;
  }
}
