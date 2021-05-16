export type PageOverview = {
    title: string;
    url: string;
    keywords?: ReadonlyArray<string>;
};

export type Paragraph = {
    type: 'paragraph';
    content: string;
};

export type Divider = {
    type: 'divider';
    // dashed?: boolean;
    // text?: {
    //     content: string;
    //     orientation?: 'left' | 'right';
    // };
};

export type ContentItem = Paragraph | Divider;

export type Section = {
    header: string;
    hash: string;
    items: ReadonlyArray<ContentItem>;
};

export type PageContent = {
    collapse?: {
        accordion?: boolean;
        defaultActiveKey?: Array<number>;
    };
    sections: ReadonlyArray<Section>;
};

export type PageDetail = PageOverview & {
    content: PageContent;
};
