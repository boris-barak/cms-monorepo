import * as React from 'react';

type Props = { children: React.ReactNode; onClick: () => void };

export const Button = ({ children, ...props }: Props) => <button {...props}>{children}</button>;
