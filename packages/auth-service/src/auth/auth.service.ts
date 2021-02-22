import { Injectable } from '@nestjs/common';
import { Credentials, PublicUser } from 'common/types/auth';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

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
}
