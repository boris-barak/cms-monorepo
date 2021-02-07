export type PageOverview = {
    title: string;
    url: string;
};

export type PageDetail = PageOverview & {
    keywords?: ReadonlyArray<string>;
    content: string;
};
