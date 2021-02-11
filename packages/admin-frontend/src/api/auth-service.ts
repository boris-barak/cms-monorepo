import { Credentials } from 'common/types/auth';

export const login = async (credentials: Credentials): Promise<boolean> => {
    console.log('login request', credentials);

    return new Promise<boolean>((resolve) => {
        resolve(credentials.login === 'admin' && credentials.password === 'admin');
    });
};
