export type PageOverview = {
    title: string;
    url: string;
};

export type Paragraph = {
    type: 'paragraph';
    content: string;
};

export type Divider = {
    type: 'divider';
    dashed?: boolean;
    text?: {
        content: string;
        orientation?: 'left' | 'right';
    };
};

export type ContentItem = Paragraph | Divider;

export type Section = {
    header: string;
    hash: string;
    items: Array<ContentItem>;
};

export type PageContent = {
    collapse?: {
        accordion?: boolean;
        defaultActiveKey?: Array<number>;
    };
    sections: Array<Section>;
};

export type PageDetail = PageOverview & {
    keywords?: Array<string>;
    content: PageContent;
};
