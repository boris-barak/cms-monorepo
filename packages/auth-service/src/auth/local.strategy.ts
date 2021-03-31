import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PublicUser } from 'cms-common/types/auth';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<PublicUser> {
        const user = await this.authService.validateUser({ email, password });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
