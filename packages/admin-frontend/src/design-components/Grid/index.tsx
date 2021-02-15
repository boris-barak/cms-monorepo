import * as React from 'react';

type Children = { children: React.ReactNode };

export const Grid = ({ children }: Children) => <table>{children}</table>;

export const GridHeader = ({ children }: Children) => (
    <thead>
        <GridRow>{children}</GridRow>
    </thead>
);

export const GridHeaderColumn = ({ children }: Children) => <th>{children}</th>;

export const GridBody = ({ children }: Children) => <tbody>{children}</tbody>;
export const GridRow = ({ children }: Children) => <tr>{children}</tr>;

type CommonItemProps = { colSpan?: number };
type ItemProps =
    | (Children & { htmlContent?: undefined } & CommonItemProps)
    | ({ children?: undefined; htmlContent: string } & CommonItemProps);

export const GridItem = ({ children, htmlContent, ...props }: ItemProps) => (
    <td {...props} dangerouslySetInnerHTML={htmlContent ? { __html: htmlContent } : undefined}>
        {children}
    </td>
);
