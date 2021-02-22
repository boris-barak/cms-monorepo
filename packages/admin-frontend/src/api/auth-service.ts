import { Credentials, PublicUser } from 'common/types/auth';
import axios from 'axios';

const authServiceApi = axios.create({ baseURL: 'http://localhost:4001' });

// auth/login
export const login = async (credentials: Credentials): Promise<boolean> => {
    console.log('login request', credentials);

    return authServiceApi.post('auth/login', { ...credentials }).then((response) => !!response.data);
};
