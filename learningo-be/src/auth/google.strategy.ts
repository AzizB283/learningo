import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      clientID: '',
      clientSecret: '',
      callbackURL: '',
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.userService.validateUser({
      email: profile.emails[0].value,
      displayname: profile.displayName,
      userphoto: profile.photos[0].value,
    });
    return user || null;
  }
}
