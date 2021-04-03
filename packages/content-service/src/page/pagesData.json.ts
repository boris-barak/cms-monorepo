import { PageDetail } from 'cms-common/types/page';

export const pagesData: ReadonlyArray<PageDetail> = [
    {
        title: 'Homepage',
        url: '',
        keywords: ['test', 'page'],
        content: {
            sections: [
                {
                    header: 'Welcome to the website!',
                    hash: 'welcome',
                    items: [
                        {
                            type: 'paragraph',
                            content: `This is the content of the Homepage.`,
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'About us',
        url: 'about-us',
        keywords: ['us'],
        content: {
            sections: [
                {
                    header: 'Who are we?',
                    hash: 'us',
                    items: [
                        {
                            type: 'paragraph',
                            content: `We are bla bla bla...`,
                        },
                        {
                            type: 'divider',
                            dashed: true,
                            text: {
                                content: 'Some divider text',
                                orientation: 'left',
                            },
                        },
                        {
                            type: 'paragraph',
                            content: `Another bla bla bla...`,
                        },
                    ],
                },
                {
                    header: 'History',
                    hash: 'history',
                    items: [
                        {
                            type: 'paragraph',
                            content: `We started as bla bla bla...`,
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Contact',
        url: 'contact',
        content: {
            sections: [
                {
                    header: 'Where can you find us',
                    hash: 'address',
                    items: [
                        {
                            type: 'paragraph',
                            content: 'This is our address...',
                        },
                    ],
                },
                {
                    header: 'You can write us',
                    hash: 'email',
                    items: [
                        {
                            type: 'paragraph',
                            content: 'This is our email...',
                        },
                    ],
                },
            ],
        },
    },
];
