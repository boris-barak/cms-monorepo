import * as React from 'react';
import styles from './styles.module.css';

type Children = { children: React.ReactNode };

export const Grid = ({ children }: Children) => <table className={styles.grid}>{children}</table>;

export const GridHeader = ({ children }: Children) => (
    <thead>
        <GridRow>{children}</GridRow>
    </thead>
);

type HeaderColumnProps = Children & { border?: boolean };

export const GridHeaderColumn = ({ children, border = false }: HeaderColumnProps) => (
    <th className={border ? styles.gridItemBorder : undefined}>{children}</th>
);

export const GridBody = ({ children }: Children) => <tbody>{children}</tbody>;
export const GridRow = ({ children }: Children) => <tr className={styles.gridRow}>{children}</tr>;

type CommonItemProps = { colSpan?: number; border?: boolean };
type ItemProps =
    | (Children & { htmlContent?: undefined } & CommonItemProps)
    | ({ children?: undefined; htmlContent: string } & CommonItemProps);

export const GridItem = ({ children, border = false, htmlContent, ...props }: ItemProps) => (
    <td
        className={border ? styles.gridItemBorder : undefined}
        {...props}
        dangerouslySetInnerHTML={htmlContent ? { __html: htmlContent } : undefined}
    >
        {children}
    </td>
);
