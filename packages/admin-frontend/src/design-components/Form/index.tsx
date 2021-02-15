import * as React from 'react';
import styles from './styles.module.css';

type Children = { children: React.ReactNode };

export const Form = ({ children }: Children) => (
    <fieldset className={styles.fieldset}>
        <table>
            <tbody>{children}</tbody>
        </table>
    </fieldset>
);

type CommonInputProps = {
    name: string;
    label?: string;
    defaultValue?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type InputProps = CommonInputProps & { type: 'text' | 'password' };

const Input = ({ name, label, ...props }: InputProps) => (
    <tr>
        {label && (
            <th className={styles.label}>
                <label htmlFor={name}>{label}</label>
            </th>
        )}
        <td>
            <input {...props} />
        </td>
    </tr>
);

export const TextInput = ({ ...props }: CommonInputProps) => <Input type="text" {...props} />;

export const PasswordInput = ({ ...props }: CommonInputProps) => <Input type="password" {...props} />;

export const ButtonArea = ({ children }: Children) => (
    <tr className={styles.buttonArea}>
        <td colSpan={2}>{children}</td>
    </tr>
);
