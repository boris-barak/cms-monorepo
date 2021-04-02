import { Credentials } from 'cms-common/types/auth';
import axios from 'axios';

const authServiceApi = axios.create({ baseURL: 'http://localhost:4001' });

export const login = async (credentials: Credentials): Promise<string | undefined> =>
    authServiceApi
        .post('auth/login', { ...credentials })
        .then((response) => response.data?.access_token)
        .catch(() => undefined);
