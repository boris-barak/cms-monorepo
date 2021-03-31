import { Injectable } from '@nestjs/common';
import { Credentials, PublicUser } from 'cms-common/types/auth';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser({
        email,
        password,
    }: Credentials): Promise<PublicUser | null> {
        const user = await this.usersService.findOne(email);

        if (user?.password === password) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: PublicUser) {
        return {
            access_token: this.jwtService.sign(user),
        };
    }
}
