// auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:7200/auth/google/redirect',
      scope: [
        'email',
        'profile',
        // 'https://www.googleapis.com/auth/user.birthday.read',
        // 'https://www.googleapis.com/auth/user.gender.read',
      ],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const url =
      'https://people.googleapis.com/v1/people/me?personFields=birthdays,genders,names,emailAddresses,photos';

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const people = await res.json();

    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0].value,
      gender: people.genders?.[0]?.value,
      birthday: people.birthdays?.[0]?.date,
      provider: 'google',
    };

    done(null, user);
  }
}
