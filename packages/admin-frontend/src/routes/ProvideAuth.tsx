import * as React from 'react';

import { authContext, useProvideAuth } from './hooks';

type Props = { children: React.ReactNode };

export const ProvideAuth = ({ children }: Props) => {
    const auth = useProvideAuth();
    console.log('auth in ProvideAuth', auth);
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
