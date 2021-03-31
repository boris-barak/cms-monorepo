import { PageDetail } from 'cms-common/types/page';

export const pagesData: ReadonlyArray<PageDetail> = [
    {
        title: 'Homepage',
        url: '',
        keywords: ['test', 'page'],
        content: `This is the content of the Homepage. <strong>This is bold.</strong>
        <strong>This is italic.</strong> <a href="/about-us">This is a link.</a>`,
    },
    {
        title: 'About us',
        url: 'about-us',
        keywords: ['us'],
        content: 'This is the content of the About us page. <a href="/">This is a link.</a>',
    },
    {
        title: 'Contact',
        url: 'contact',
        content: 'This is the content of Contact page.',
    },
];
