import { Injectable } from '@nestjs/common';
import { PublicUser } from 'cms-common/types/auth';

type ProtectedUser = PublicUser & {
    password: string;
};

@Injectable()
export class UsersService {
    private readonly users: ReadonlyArray<ProtectedUser> = [
        {
            id: 1,
            email: 'admin@example.com',
            password: 'admin',
        },
        {
            id: 2,
            email: 'user@example.com',
            password: 'guess',
        },
    ];

    async findOne(email: string): Promise<ProtectedUser | undefined> {
        return this.users.find((user) => user.email === email);
    }
}
