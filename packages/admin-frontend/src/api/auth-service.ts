import { Credentials } from 'cms-common/types/auth';
import axios from 'axios';

const authServiceApi = axios.create({ baseURL: 'http://localhost:4001' });

// auth/login
export const login = async (credentials: Credentials): Promise<string | undefined> => {
    console.log('login request', credentials);

    return authServiceApi
        .post('auth/login', { ...credentials })
        .then((response) => {
            console.log('response', response);
            return response.data?.access_token;
        })
        .catch((error) => {
            console.log(error);
            return undefined;
        });
};
