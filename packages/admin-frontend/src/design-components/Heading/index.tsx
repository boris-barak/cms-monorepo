import * as React from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const getTag = (level: HeadingLevel): keyof JSX.IntrinsicElements => {
    switch (level) {
        case 1:
            return 'h1';
        case 2:
            return 'h2';
        case 3:
            return 'h3';
        case 4:
            return 'h4';
        case 5:
            return 'h5';
        case 6:
            return 'h6';
    }
};

type Props = { level: HeadingLevel; children: React.ReactNode };

export const Heading = ({ level, children }: Props) => {
    const Tag = getTag(level);
    return <Tag>{children}</Tag>;
};
